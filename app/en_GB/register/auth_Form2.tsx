"use client";
import React, { useState } from "react";
import Link from "next/link";
import { instrument_Sans } from "@/app/ui/fonts";
import { HiOutlineDotsVertical } from "react-icons/hi";
import CircleLoader from "react-spinners/CircleLoader";
import clsx from "clsx";

export default function AuthForm({ type }: { type: string }) {
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const [letter, setLetter] = useState(false);
  const [special, setSpecial] = useState(false);
  const [number, setNumber] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [length, setLength] = useState(false);

  const testPassword = (password: string) => {
    const letter = /[a-zA-Z]/.test(password);
    const number = /[0-9]/.test(password);
    const special = /[^a-zA-Z0-9]/.test(password);
    const lenghts = password.length > 8;
    setLength(lenghts);
    setSpecial(special);
    setNumber(number);
    setLetter(letter);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      className={instrument_Sans.className}
    >
      <div className="grid gap-y-5">
        {status && (
          <button
            className="inline-flex group justify-start pl-4 "
            onClick={(e) => {
              e.preventDefault();
              setStatus(false);
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-6 rotate-180  transition-transform duration-300 group-hover:-translate-x-1"
              width="24"
              height="24"
              role="presentation"
              focusable="false"
            >
              <path
                d="M5 11.75h12m-5.25-6.5 6.25 6.5-6.25 6.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                vectorEffect="non-scaling-stroke"
              ></path>
            </svg>
            <span className="underline decoration-1 font-light underline-offset-2 transition-colors hover:decoration-slate-300  decoration-black">
              Back
            </span>
          </button>
        )}

        {type == "login" ? (
          <h3 className="text-2xl font-medium">Log in or sign up</h3>
        ) : (
          <h3 className="text-2xl font-medium">Sign up or Log in</h3>
        )}
        {!status && (
          <>
            <div className="w-full flex items-center border hover:bg-[#f7f5f2] ">
              <div className="flex  flex-col w-full ">
                <p className="text-sm ">Continue with Google</p>
              </div>
              <div className="shrink-0">
                <div style={{ zIndex: 2 }} className=" w-10 h-10 ">
                  <button
                    style={{
                      aspectRatio: 1,
                      cursor: "pointer",
                      overflow: "unset",
                    }}
                    className="m-0 inline-flex pr-2 relative items-center justify-center p-0 w-full box-border"
                  >
                    <span className="">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        className="size-9"
                      >
                        <g>
                          <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                          ></path>
                          <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                          ></path>
                          <path
                            fill="#FBBC05"
                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                          ></path>
                          <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                          ></path>
                          <path fill="none" d="M0 0h48v48H0z"></path>
                        </g>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center border hover:bg-[#f7f5f2]">
              <div className="shrink-0">
                <div style={{ zIndex: 2 }} className=" w-10 h-10 ">
                  <button
                    style={{
                      aspectRatio: 1,
                      cursor: "pointer",
                      overflow: "unset",
                    }}
                    className="m-0 inline-flex relative items-center justify-center p-0 w-full box-border"
                  >
                    <span className="">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="size-9"
                        role="presentation"
                        focusable="false"
                      >
                        <path
                          d="M18.695 16.469a8.691 8.691 0 0 1-.86 1.546c-.453.645-.823 1.092-1.109 1.34-.442.407-.916.615-1.424.627-.364 0-.804-.104-1.315-.314-.514-.21-.985-.313-1.417-.313-.452 0-.937.103-1.456.313-.52.21-.938.32-1.258.33-.487.021-.972-.193-1.457-.643-.309-.27-.696-.732-1.159-1.387a9.591 9.591 0 0 1-1.225-2.434c-.343-.999-.515-1.966-.515-2.902 0-1.072.232-1.997.696-2.772a4.082 4.082 0 0 1 1.457-1.474 3.92 3.92 0 0 1 1.97-.556c.387 0 .894.12 1.524.355.628.236 1.032.355 1.209.355.132 0 .58-.14 1.34-.418.718-.259 1.325-.366 1.822-.324 1.346.109 2.357.64 3.03 1.595-1.204.73-1.8 1.752-1.788 3.062.01 1.021.381 1.87 1.109 2.545.33.313.698.555 1.108.727-.089.258-.183.505-.282.742ZM15.607 4.32c0 .8-.292 1.547-.875 2.239-.703.822-1.553 1.297-2.476 1.222a2.502 2.502 0 0 1-.018-.303c0-.768.334-1.59.928-2.263.296-.34.673-.623 1.13-.849.457-.222.889-.345 1.295-.366.011.107.016.214.016.32Z"
                          fill="currentColor"
                          vectorEffect="non-scaling-stroke"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex  flex-col w-full ">
                <p className="text-sm ">Continue with Apple</p>
              </div>
            </div>
          </>
        )}
        <div className="flex items-center justify-center ">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-3 text-gray-500">or</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>
        <label>
          <span className="block text-start text-xs font-medium text-stone-500">
            Email address
          </span>
          <input
            type="text"
            className={clsx(
              "mt-1 block w-full px-3 py-2 hover:bg-[#f7f5f2] hover:border-black    border border-slate-300 text-sm  placeholder-stone-400",
              !status ? "text-black" : "text-stone-500",
            )}
            autoFocus
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>

        {status && (
          <>
            <div className="flex w-full space-x-2">
              <label className="block">
                <span className="block text-start text-xs font-medium text-stone-500">
                  First name
                </span>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 hover:bg-[#f7f5f2] hover:border-black    border border-slate-300 text-sm  placeholder-stone-400 "
                  autoFocus
                  name="firstname"
                />
              </label>{" "}
              <label className="block">
                <span className="block text-start text-xs font-medium text-stone-500">
                  Last name
                </span>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 hover:bg-[#f7f5f2] hover:border-black    border border-slate-300 text-sm  placeholder-stone-400 "
                  name="lastname"
                />
              </label>
            </div>
            <label className="block">
              <span className="block text-start text-xs font-medium text-stone-500">
                Password
              </span>
              <div className=" relative">
                <input
                  type={hidden ? "password" : "text"}
                  className="mt-1 block w-full px-3 py-2 hover:bg-[#f7f5f2] hover:border-black    border border-slate-300 text-sm  placeholder-stone-400 "
                  name="password"
                  hidden
                  onChange={(e) => {
                    testPassword(e.target.value);
                  }}
                  onClick={() => {
                    setVisible(true);
                  }}
                />
                <div className="absolute top-0 right-1 h-full flex items-center justify-center ">
                  {hidden ? (
                    <button
                      type="button"
                      className="p-1 hover:bg-stone-300"
                      onClick={() => {
                        setHidden(false);
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="dig-UIIcon dig-UIIcon--standard"
                        width="24"
                        height="24"
                        role="presentation"
                        focusable="false"
                      >
                        <path
                          d="M12 9.5A2.321 2.321 0 0 0 9.5 12a2.321 2.321 0 0 0 2.5 2.5 2.32 2.32 0 0 0 2.5-2.5A2.322 2.322 0 0 0 12 9.5Z"
                          fill="currentColor"
                          vectorEffect="non-scaling-stroke"
                        ></path>
                        <path
                          d="M20.177 11.678C20.067 11.446 17.41 6 12 6c-5.412 0-8.067 5.446-8.177 5.678L3.669 12l.153.322C3.933 12.554 6.588 18 12 18c5.411 0 8.066-5.446 8.177-5.678L20.33 12l-.154-.322ZM12 16.5c-3.77 0-6.03-3.42-6.65-4.5.62-1.081 2.878-4.5 6.65-4.5 3.771 0 6.028 3.418 6.65 4.5-.622 1.082-2.88 4.5-6.65 4.5Z"
                          fill="currentColor"
                          vectorEffect="non-scaling-stroke"
                        ></path>
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className=" hover:bg-stone-300"
                      onClick={() => {
                        setHidden(true);
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="dig-UIIcon dig-UIIcon--standard"
                        width="24"
                        height="24"
                        role="presentation"
                        focusable="false"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6 19.203 20.142 5.06 19.082 4l-2.697 2.696a7.809 7.809 0 0 0-4.054-1.135c-5.411 0-8.066 5.446-8.177 5.677L4 11.561l.154.322c.068.143 1.106 2.273 3.163 3.882l-2.378 2.377L6 19.202Zm2.398-4.52c-1.443-1.077-2.356-2.495-2.717-3.122.62-1.081 2.878-4.5 6.65-4.5 1.114 0 2.096.298 2.943.746L13.703 9.38a2.32 2.32 0 0 0-1.372-.318 2.321 2.321 0 0 0-2.5 2.5 2.321 2.321 0 0 0 .318 1.371l-1.751 1.752Z"
                          fill="currentColor"
                          vectorEffect="non-scaling-stroke"
                        ></path>
                        <path
                          d="M12.331 16.06a6.09 6.09 0 0 1-1.091-.097L10 17.203c.71.225 1.487.358 2.331.358 5.412 0 8.067-5.446 8.177-5.678l.154-.322-.154-.323c-.052-.109-.667-1.37-1.866-2.677l-1.07 1.07c.7.77 1.173 1.519 1.409 1.93-.622 1.081-2.88 4.5-6.65 4.5Z"
                          fill="currentColor"
                          vectorEffect="non-scaling-stroke"
                        ></path>
                      </svg>
                    </button>
                  )}
                  <span>
                    <HiOutlineDotsVertical className="size-5" />
                  </span>
                </div>
              </div>
            </label>
            {visible && (
              <>
                <span className="w-full  box-border">
                  <ul className="flex space-y-1 flex-col">
                    <li className="inline-flex w-full">
                      <div className="flex items-center">
                        <div className="shrink-0">
                          {length ? (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              className="dig-UIIcon dig-UIIcon--standard"
                              width="24"
                              height="24"
                              role="presentation"
                              focusable="false"
                            >
                              <path
                                d="M12 4c-5.159 0-8 2.841-8 8s2.841 8 8 8 8-2.841 8-8-2.841-8-8-8Zm-1 11.56-3.03-3.03 1.06-1.06L11 13.44l3.97-3.97 1.06 1.06L11 15.56Z"
                                fill="green"
                                vectorEffect="non-scaling-stroke"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              className="dig-UIIcon dig-UIIcon--standard _password-validator-default-icon_4j67a_43"
                              width="24"
                              height="24"
                              role="presentation"
                              focusable="false"
                            >
                              <path
                                d="M12 4c-5.159 0-8 2.841-8 8s2.841 8 8 8 8-2.841 8-8-2.841-8-8-8Zm3.536 10.475-1.061 1.06L12 13.06l-2.475 2.476-1.06-1.061L10.94 12 8.463 9.525l1.061-1.06L12 10.94l2.475-2.476 1.06 1.061L13.06 12l2.476 2.475Z"
                                fill="gray"
                                vectorEffect="non-scaling-stroke"
                              ></path>
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-black font-light text-xs">
                            At least 8 characters
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="inline-flex w-full">
                      <div className="flex items-center">
                        <div className="shrink-0">
                          {letter ? (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              className="dig-UIIcon dig-UIIcon--standard"
                              width="24"
                              height="24"
                              role="presentation"
                              focusable="false"
                            >
                              <path
                                d="M12 4c-5.159 0-8 2.841-8 8s2.841 8 8 8 8-2.841 8-8-2.841-8-8-8Zm-1 11.56-3.03-3.03 1.06-1.06L11 13.44l3.97-3.97 1.06 1.06L11 15.56Z"
                                fill="green"
                                vectorEffect="non-scaling-stroke"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              className="dig-UIIcon dig-UIIcon--standard _password-validator-default-icon_4j67a_43"
                              width="24"
                              height="24"
                              role="presentation"
                              focusable="false"
                            >
                              <path
                                d="M12 4c-5.159 0-8 2.841-8 8s2.841 8 8 8 8-2.841 8-8-2.841-8-8-8Zm3.536 10.475-1.061 1.06L12 13.06l-2.475 2.476-1.06-1.061L10.94 12 8.463 9.525l1.061-1.06L12 10.94l2.475-2.476 1.06 1.061L13.06 12l2.476 2.475Z"
                                fill="gray"
                                vectorEffect="non-scaling-stroke"
                              ></path>
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-black font-light text-xs">
                            1 letter
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="inline-flex w-full">
                      <div className="flex items-center">
                        <div className="shrink-0">
                          {number ? (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              className="dig-UIIcon dig-UIIcon--standard"
                              width="24"
                              height="24"
                              role="presentation"
                              focusable="false"
                            >
                              <path
                                d="M12 4c-5.159 0-8 2.841-8 8s2.841 8 8 8 8-2.841 8-8-2.841-8-8-8Zm-1 11.56-3.03-3.03 1.06-1.06L11 13.44l3.97-3.97 1.06 1.06L11 15.56Z"
                                fill="green"
                                vectorEffect="non-scaling-stroke"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              className="dig-UIIcon dig-UIIcon--standard _password-validator-default-icon_4j67a_43"
                              width="24"
                              height="24"
                              role="presentation"
                              focusable="false"
                            >
                              <path
                                d="M12 4c-5.159 0-8 2.841-8 8s2.841 8 8 8 8-2.841 8-8-2.841-8-8-8Zm3.536 10.475-1.061 1.06L12 13.06l-2.475 2.476-1.06-1.061L10.94 12 8.463 9.525l1.061-1.06L12 10.94l2.475-2.476 1.06 1.061L13.06 12l2.476 2.475Z"
                                fill="gray"
                                vectorEffect="non-scaling-stroke"
                              ></path>
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-black font-light text-xs">
                            1 number
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="inline-flex w-full">
                      <div className="flex items-center">
                        <div className="shrink-0">
                          {special ? (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              className="dig-UIIcon dig-UIIcon--standard"
                              width="24"
                              height="24"
                              role="presentation"
                              focusable="false"
                            >
                              <path
                                d="M12 4c-5.159 0-8 2.841-8 8s2.841 8 8 8 8-2.841 8-8-2.841-8-8-8Zm-1 11.56-3.03-3.03 1.06-1.06L11 13.44l3.97-3.97 1.06 1.06L11 15.56Z"
                                fill="green"
                                vectorEffect="non-scaling-stroke"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              className="dig-UIIcon dig-UIIcon--standard _password-validator-default-icon_4j67a_43"
                              width="24"
                              height="24"
                              role="presentation"
                              focusable="false"
                            >
                              <path
                                d="M12 4c-5.159 0-8 2.841-8 8s2.841 8 8 8 8-2.841 8-8-2.841-8-8-8Zm3.536 10.475-1.061 1.06L12 13.06l-2.475 2.476-1.06-1.061L10.94 12 8.463 9.525l1.061-1.06L12 10.94l2.475-2.476 1.06 1.061L13.06 12l2.476 2.475Z"
                                fill="gray"
                                vectorEffect="non-scaling-stroke"
                              ></path>
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-black font-light text-xs">
                            1 special character
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </span>
              </>
            )}
          </>
        )}
        {!status && (
          <div
            onClick={() => {
              setStatus(true);
            }}
            className="w-full p-3 flex justify-center cursor-pointer rounded-xl bg-[#0061fe] text-white"
          >
            {loader ? (
              <CircleLoader color="white" loading={loader} size={27} />
            ) : (
              "Continue"
            )}
          </div>
        )}
        {status && (
          <>
            <span className="font-light text-xs text-left">
              By selecting {"Agree and sign up"} I agree to the{" "}
              <Link className="text-blue-600" href={""}>
                Dropbox Terms
              </Link>{" "}
              and
              <Link className="text-blue-600" href={""}>
                {" "}
                Service agreement
              </Link>
              . Learn about how we use and protect your data in our{" "}
              <Link className="text-blue-600" href={""}>
                Private policy
              </Link>
              .
            </span>
            <button
              type="submit"
              className="w-full p-3 flex justify-center font-semibold rounded-xl bg-[#0061fe] text-white"
              onClick={() => {
                setLoader(true);
              }}
            >
              {loader ? (
                <CircleLoader color="white" loading={loader} size={27} />
              ) : (
                "Agree and sign up"
              )}
            </button>
          </>
        )}
        <div className="w-full ">
          <Link href="/en_GB/login">
            {" "}
            <p className="inline-flex items-center text-base font-medium group  underline underline-offset-2 decoration-1 hover:decoration-white transition-colors duration-200 decoration-stone-400">
              {"Already have an account, "}{" "}
              <span className="font-semibold text-base">Login</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                width="24"
                height="24"
                role="presentation"
                focusable="false"
              >
                <path
                  d="M5 11.75h12m-5.25-6.5 6.25 6.5-6.25 6.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  vectorEffect="non-scaling-stroke"
                ></path>
              </svg>
            </p>
          </Link>
        </div>
      </div>
    </form>
  );
}
