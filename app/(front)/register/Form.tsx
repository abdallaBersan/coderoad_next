// "use client";

// import { signIn, useSession } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import Link from "next/link";
// import { signInSchema } from "@/lib/zod";

// type Inputs = {
//   username: string;
//   password: string;
//   confirmPassword: string;
// };

// const Form = () => {
//   const { data: session } = useSession();

//   const params = useSearchParams();
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     getValues,
//     setError,
//     formState: { errors, isSubmitting },
//   } = useForm<Inputs>({
//     defaultValues: {
//       username: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const formSubmit: SubmitHandler<Inputs> = async (form) => {
//     // const { username, password } = form;

//     const { username, password } = signInSchema.parse(form);
//     try {
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });

//       if (res.ok) {
//         signIn("credentials", {
//           username,
//           password,
//           redirect: true,
//           callbackUrl: "/",
//         });
//       } else {
//         const error = await res.json();
//         console.log(error.message.code);

//         throw { message: error.message, code: error.message.code };
//       }
//     } catch (err: any) {
//       if (err.errors) {
//         // Gérer les erreurs de validation zod en utilisant setError
//         err.errors.forEach((error: any) => {
//           setError(error.path[0], { message: error.message });
//         });
//       } else {
//         const errorMessage =
//           err.message.code === "P2002"
//             ? "Username is already used"
//             : err.message;
//         // Affichez un message d'erreur général ici si besoin
//         setError("username", { message: errorMessage });
//       }
//     }
//   };

//   return (
//     <div className="max-w-sm  mx-auto card bg-base-300 my-4">
//       <div className="card-body">
//         <h1 className="card-title">Register</h1>
//         <form onSubmit={handleSubmit(formSubmit)}>
//           <div className="my-2">
//             <label className="label" htmlFor="username">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               {...register("username", {
//                 required: "Username is required",
//               })}
//               className="input input-bordered w-full max-w-sm"
//             />
//             {errors.username?.message && (
//               <div className="text-error">{errors.username.message}</div>
//             )}
//           </div>
//           <div className="my-2">
//             <label className="label" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               {...register("password", {
//                 required: "Password is required",
//               })}
//               className="input input-bordered w-full max-w-sm"
//             />
//             {errors.password?.message && (
//               <div className="text-error">{errors.password.message}</div>
//             )}
//           </div>
//           <div className="my-2">
//             <label className="label" htmlFor="confirmPassword">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               {...register("confirmPassword", {
//                 required: "Confirm Password is required",
//                 validate: (value) => {
//                   const { password } = getValues();
//                   return password === value || "Passwords should match!";
//                 },
//               })}
//               className="input input-bordered w-full max-w-sm"
//             />
//             {errors.confirmPassword?.message && (
//               <div className="text-error">{errors.confirmPassword.message}</div>
//             )}
//           </div>
//           <div className="my-2 mt-5">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="btn btn-primary w-full"
//             >
//               {isSubmitting && (
//                 <span className="loading loading-spinner"></span>
//               )}
//               S'inscrire
//             </button>
//           </div>
//         </form>

//         <div className="divider"> </div>
//         <div>
//           Vous avez déjà un compte?{" "}
//           <Link className="link" href={`/signin`}>
//             Se connecter
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Form;
