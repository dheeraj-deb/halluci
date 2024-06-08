import Layout from "../layouts/Main";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { server } from "../utils/server";
import { postData } from "../utils/services";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useMutation, useQuery } from "@apollo/client";
import { SEND_OTP, VERIFY_OTP } from "../graphql/mutation/auth";
import { GET_PROFILE } from "../graphql/query/profile";
type LoginWithOtpType = {
  phone: string;
  otp?: string;
};

const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [sendOtp, { error: errorWhileSending, loading }] =
    useMutation(SEND_OTP);
  const [verifyOtp, { error: errorWhileVerification }] =
    useMutation(VERIFY_OTP);


  useEffect(() => {
    console.log(errorWhileSending?.cause, errorWhileVerification);
  }, [errorWhileSending]);
  const onSubmit = async (credentials: LoginWithOtpType) => {
    console.log("came");
    try {
      if (step === 1)
        return await sendOtp({
          variables: { phone: credentials.phone },
          onCompleted: (data) => {
            setPhone(credentials.phone);
            setStep((prev) => (prev < 2 ? prev + 1 : prev));

            console.log(data);
          },
        });
      console.log(phone);
      
      await verifyOtp({
        variables: { phone, otp },
        onCompleted: (data) => {
          console.log(data);
        },
      });
      setStep((prev) => (prev < 2 ? prev + 1 : prev));
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };

  // const nextStep = () => {
  //   setStep((prev) => (prev < 2 ? prev + 1 : prev));
  // };

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
            <h2 className="form-block__title">Log in</h2>
            <p className="form-block__description">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p>

            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              {step === 1 && (
                <>
                  <div className="form__input-row">
                    <input
                      className="form__input"
                      placeholder="phone number"
                      type="text"
                      name="phone"
                      ref={register({
                        required: true,
                        pattern: /[0-9]{10}/,
                      })}
                    />

                    {errors.phone && errors.phone.type === "required" && (
                      <p className="message message--error">
                        This field is required
                      </p>
                    )}

                    {errors.phone && errors.phone.type === "pattern" && (
                      <p className="message message--error">
                        Please write a valid phone number
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn--rounded btn--yellow btn-submit"
                  >
                    {!loading ? "Sign in" : "Sending..."}
                  </button>
                  <p className="form__signup-link">
                    Not a member yet? <a href="/register">Sign up</a>
                  </p>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="form__input-row justify-content-center">
                    <OtpInput
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
                    {errors.email && errors.email.type === "required" && (
                      <p className="message message--error">
                        This field is required
                      </p>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <p className="message message--error">
                        Please write a valid email
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn--rounded btn--yellow btn-submit"
                  >
                    Continue
                  </button>
                </>
              )}
              {/*<div className="form__input-row">
                <input
                  className="form__input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  ref={register({ required: true })}
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="message message--error">
                    This field is required
                  </p>
                )}
                <input
                  className="form__input"
                  placeholder="username"
                  type="text"
                  name="email"
                  ref={register({
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />

                {errors.email && errors.email.type === "required" && (
                  <p className="message message--error">
                    This field is required
                  </p>
                )}

                {errors.email && errors.email.type === "pattern" && (
                  <p className="message message--error">
                    Please write a valid email
                  </p>
                )}
              </div>*/}

            
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
