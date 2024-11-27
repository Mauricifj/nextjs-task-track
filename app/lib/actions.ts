'use server';

import { redirect } from 'next/navigation';
import { signIn, signUp } from '@/authentication/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';

const SignUpFormSchema = z.object({
    name: z.string({
        invalid_type_error: 'Please enter a valid name.',
    }).min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string({
        invalid_type_error: 'Please enter a valid email.',
    }).email({ message: "Please enter a valid email" }),
    password: z.string({
        invalid_type_error: 'Please enter a valid password.',
    }).min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters long" }),
}).refine(
    (values) => {
        return values.password === values.confirmPassword;
    },
    {
        message: "Passwords must match!",
        path: ["confirmPassword"],
    }
);

const LoginFormSchema = z.object({
    email: z.string({
        invalid_type_error: 'Please enter a valid email.',
    }).email({ message: "Please enter a valid email" }),
    password: z.string({
        invalid_type_error: 'Please enter a valid password.',
    }).min(6, { message: "Password must be at least 6 characters long" }),
});

export type SignUpState = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    };
    message?: string | null;
};

export type LoginState = {
    errors?: {
        email?: string[];
        password?: string[];
    };
    message?: string | null;
};

export async function authenticate(
    prevState: LoginState,
    formData: FormData,
) {
    try {
        const validatedFields = LoginFormSchema.safeParse({
            email: formData.get('email'),
            password: formData.get('password'),
        });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Please correct the errors.',
            };
        }

        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        errors: {},
                        message: 'Invalid email or password.',
                    };
                default:
                    return {
                        errors: {},
                        message: 'Failed to sign in',
                    };
            }
        }
        throw error;
    }
    redirect("/home");
}

export async function register(
    prevState: SignUpState,
    formData: FormData,
) {
    try {
        const validatedFields = SignUpFormSchema.safeParse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Please correct the errors.',
            };
        }

        const { name, email, password } = validatedFields.data;

        const result = await signUp({ id: '', name, email, password });
        if (!result) {
            return {
                errors: {},
                message: 'Failed to create user',
            };
        }
    } catch (error) {
        console.error('Failed to create user:', error);
        return {
            errors: {},
            message: 'Failed to create user',
        };
    }
    redirect("/login");
}