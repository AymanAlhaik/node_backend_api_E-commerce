import {z} from 'zod';
// export const SignUpSchema = z.object({
//     name:z.string(),
//     email:z.email(),
//     password:z.string().min(6),
// });

export const SignUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Email not valid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
