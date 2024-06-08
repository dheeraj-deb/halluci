import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../layouts/Main";
import Link from "next/link";
import OTPInput from "react-otp-input";
import { REGISTER_USER } from "../graphql/mutation/registerUser";
import { SEND_OTP, VERIFY_OTP } from "graphql/mutation/auth";

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    phoneNumber: "",
    name: "",
    shop_name: "",
    address: {
      address: "",
    },
    password: "",
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    if (e.target.name === "address") {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          address: e.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const nextStep = () => {
    setStep((prev) => (prev < 3 ? prev + 1 : prev));
  };

  const [register, { error, loading, data }] = useMutation(REGISTER_USER);
  const [sendOtp, { error, loading, data }] = useMutation(SEND_OTP);
  const [verifyOtp, { error, loading, data }] = useMutation(VERIFY_OTP);

  const handleSubmit = async () => {
    try {
      if (step == 1) {
        return await sendOtp({
          variables: { phone: formData.phoneNumber },
          onCompleted(data) {
            setStep((prev) => (prev < 2 ? prev + 1 : prev));
          },
        });
      }
      if(step == 2) {
        return await verifyOtp({
          variables: { phone:formData.phoneNumber, otp },
          onCompleted: (data) => {
            setStep((prev) => (prev < 2 ? prev + 1 : prev));
            console.log(data);
          },
        });
      }


      register({
        variables: {
          name: formData.name,
          shopname: formData.shop_name,
          phonenumber: formData.phoneNumber,
          address: formData.address,
        },
        onCompleted: (data) => {
          console.log("data", data);
          if (data.registration.status === 200) {
            router.push("/");
          }
        },
      });
    } catch (err) {}
  };

  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/products">
              <a>
                <i className="icon-left"></i> Back to store
              </a>
            </Link>
          </div>

          <div className="form-block">
            <h2 className="form-block__title">
              Create an account and discover the benefits
            </h2>
            <p className="form-block__description">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p>

            <form className="form" >
              {step === 1 && (
                <>
                  <div className="form__input-row">
                    <input
                      className="form__input"
                      placeholder="phone number"
                      type="text"
                      value={formData.phoneNumber}
                      name="phoneNumber"
                      onChange={handleInputChange}
                      // ref={}
                    />

                    {/* {errors.email && errors.email.type === "required" && (
                      <p className="message message--error">
                        This field is required
                      </p>
                    )}

                    {errors.email && errors.email.type === "pattern" && (
                      <p className="message message--error">
                        Please write a valid email
                      </p>
                    )} */}
                  </div>
                  <button
                    // onClick={nextStep}
                    type="submit"
                    className="btn btn--rounded btn--yellow btn-submit"
                  >
                    Sign up
                  </button>

                  <p className="form__signup-link">
                    <Link href="/login">
                      <a href="#">Are you already a member?</a>
                    </Link>
                  </p>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="form__input-row justify-content-center">
                    <OTPInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={4}
                      // renderSeparator={<span>-</span>}
                      containerStyle={{
                        justifyContent: "center",
                        gap: "15px",
                      }}
                      inputStyle={{
                        width: "40px",
                        height: "40px",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                      }}
                      renderInput={(props) => <input {...props} />}
                    />
                    {/* {errors.email && errors.email.type === "required" && (
                      <p className="message message--error">
                        This field is required
                      </p>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <p className="message message--error">
                        Please write a valid email
                      </p>
                    )} */}
                  </div>
                  <button
                    type="submit"
                    // onClick={nextStep}
                    className="btn btn--rounded btn--yellow btn-submit"
                  >
                    Continue
                  </button>
                </>
              )}
              {step === 3 && (
                <>
                  <div className="form__input-row">
                    <input
                      className="form__input"
                      placeholder="Name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form__input-row">
                    <input
                      className="form__input"
                      placeholder="Shop Name"
                      type="text"
                      name="shop_name"
                      value={formData.shop_name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form__input-row">
                    <input
                      className="form__input"
                      placeholder="Address"
                      type="text"
                      name="address"
                      value={formData.address.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form__input-row">
                    <input
                      className="form__input"
                      type="Password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form__info">
                    <div className="checkbox-wrapper">
                      <label
                        htmlFor="check-signed-in"
                        className={`checkbox checkbox--sm`}
                      >
                        <input
                          name="signed-in"
                          type="checkbox"
                          id="check-signed-in"
                        />
                        <span className="checkbox__check"></span>
                        <p>
                          I agree to the Google Terms of Service and Privacy
                          Policy
                        </p>
                      </label>
                    </div>
                    <button
                      // onClick={handleSubmit}
                      type="submit"
                      className="btn btn--rounded btn--yellow btn-submit"
                    >
                      Continue
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RegisterPage;
