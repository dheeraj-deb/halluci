import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../layouts/Main";
import Link from "next/link";
import OTPInput from "react-otp-input";
import { REGISTER_USER } from "../graphql/mutation/registerUser";
import { SEND_OTP, VERIFY_OTP_WHILE_REGISTERING } from "graphql/mutation/auth";

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState({
    otp: "",
    phone: "",
    name: "",
    shop_name: "",
    state: "",
    postalCode: "",
    city: "",
    street: "",
  });
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    shop_name: "",
    state: "",
    postalCode: "",
    city: "",
    street: "",
  });
  useEffect(() => {
    console.log(step, "hi", error);
  }, [error]);
  const router = useRouter();

  const handleInputChange = (e) => {
    setError((previousErr) => ({ ...previousErr, [e.target.name]: "" }));
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [register, {}] = useMutation(REGISTER_USER);
  const [sendOtp, {}] = useMutation(SEND_OTP);
  const [verifyOtpWhileRegistering, {}] = useMutation(
    VERIFY_OTP_WHILE_REGISTERING
  );

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (step == 1) {
        if (!formData.phone || formData.phone.length !== 10) {
          console.log("Hoii");

          return setError((previousErr) => ({
            ...previousErr,
            phone: "Please provide a proper phone number",
          }));
        }
        return await sendOtp({
          variables: { phone: formData.phone },
          onCompleted(data) {
            setStep((prev) => (prev < 3 ? prev + 1 : prev));
          },
        });
      }
      if (step == 2) {
        if (!otp || otp.length !== 4)
          return setError((previousErr) => ({
            ...previousErr,
            otp: "Please provide OTP",
          }));

        return await verifyOtpWhileRegistering({
          variables: { phone: formData.phone, otp },
          onError(error, clientOptions) {
            console.log(clientOptions);

            setError((prev) => ({
              ...prev,
              otp: error.networkError?.result?.errors[0].message,
            }));
          },
          onCompleted: (data) => {
            setStep((prev) => (prev < 3 ? prev + 1 : prev));
            console.log(data, step, "plcace");
          },
        });
      }

      for (let i in formData) {
        if (!formData[i])
          return setError((prev) => ({ ...prev, [i]: `${i} is required` }));
      }
      console.log("reg");

      await register({
        variables: {
          name: formData.name,
          shopname: formData.shop_name,
          phone: formData.phone,
          address: {
            state: formData.state,
            city: formData.city,
            postalCode: formData.postalCode,
            street: formData.street,
          },
        },
        onCompleted: (data) => {
          console.log("data", data);
          if (data.registration.status === 200) {
            router.push("/");
          }
        },
      });
    } catch (err) {
      console.log(err);
    }
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

            <form className="form" onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <div className="form__input-row">
                    <input
                      className="form__input"
                      placeholder="phone number"
                      type="text"
                      value={formData.phone}
                      name="phone"
                      onChange={handleInputChange}
                      // ref={}
                    />

                    {error.phone && (
                      <p className="message message--error">{error.phone}</p>
                    )}
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
                      onChange={(value) => {
                        setOtp(value);
                        setError((_) => ({ ..._, otp: "" }));
                      }}
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
                    {error.otp && (
                      <p className="message message--error">{error.otp}</p>
                    )}
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
                    {error.name && (
                      <p className="message message--error">{error.name}</p>
                    )}
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
                    {error.shop_name && (
                      <p className="message message--error">
                        {error.shop_name}
                      </p>
                    )}
                  </div>

                  <div className="form__input-row">
                    <input
                      className="form__input"
                      placeholder="State"
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                    />

                    {error.state && (
                      <p className="message message--error">{error.state}</p>
                    )}
                  </div>
                  <div className="form__input-row">
                    <input
                      className="form__input"
                      placeholder="City"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />

                    {error.city && (
                      <p className="message message--error">{error.city}</p>
                    )}
                  </div>

                  <div className="form__input-row">
                    <input
                      className="form__input"
                      placeholder="Street"
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                    />

                    {error.street && (
                      <p className="message message--error">{error.street}</p>
                    )}
                  </div>
                  <div className="form__input-row">
                    <input
                      className="form__input"
                      placeholder="Postal Code"
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />

                    {error.postalCode && (
                      <p className="message message--error">{error.postalCode}</p>
                    )}
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
