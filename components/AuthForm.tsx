'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Suspense } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  createAccount,
  getCurrentUser,
  getTheSession,
  GoogleLogin,
  signInUser,
} from '@/lib/actions/user.actions';
import OtpModal from '@/components/OTPModal';
import { useRouter, useSearchParams } from 'next/navigation';

type FormType = 'sign-in' | 'sign-up';

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === 'sign-up'
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [accountId, setAccountId] = useState(null);
  const urlSearchParams = useSearchParams();
  const [OAuthLoading, setOAuthLoading] = useState<boolean>(false);
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const user =
        type === 'sign-up'
          ? await createAccount({
              fullName: values.fullName || '',
              email: values.email,
            })
          : await signInUser({ email: values.email });

      setAccountId(user.accountId);
    } catch {
      setErrorMessage('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleOAuth = async () => {
    setOAuthLoading(true);
    // localStorage.setItem('OAuth', 'true');
    setErrorMessage('');
    await GoogleLogin();
    setOAuthLoading(false);
  };
  useEffect(() => {
    const userId = urlSearchParams.get('userId');
    const secret = urlSearchParams.get('secret');
    console.log(userId, secret);

    if (!userId || !secret) {
      return console.log('Couldnt login ');
    }
    setOAuthLoading(true);

    // if (userId && secret) {
    getTheSession(userId, secret)
      .then((res) => {
        localStorage.setItem('OAuth', 'false');
        console.log(res);
        // setIsLoading(false);
        setErrorMessage('');
        router.push('/');
        setOAuthLoading(false);
      })
      .catch((er: any) => {
        setIsLoading(false);
        setErrorMessage(er.message);
        console.log(er);
      });
    // }
  }, []);
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === 'sign-in' ? (
              <span>
                <span className="text-black">Sign </span>I
                <span className="text-orange">n</span>
              </span>
            ) : (
              <span>
                <span className="text-black">Sign </span>U
                <span className="text-orange">P</span>
              </span>
            )}
          </h1>
          {type === 'sign-up' && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Full Name</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="shad-input text-white"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          <div
            className={`w-full ${type == 'sign-in' ? 'flex justify-around items-center' : ''}`}
          >
            <Button
              type="submit"
              className={`rounded-xl p-5 ${type == 'sign-in' ? 'w-[40%]' : 'w-full'}`}
              disabled={isLoading}
            >
              {type === 'sign-in' ? 'Sign In' : 'Sign Up'}

              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )}
            </Button>

            {type == 'sign-in' && (
              <Button onClick={handleGoogleOAuth} className="rounded-xl p-5">
                <Image
                  src={'https://img.icons8.com/color/512/google-logo.png'}
                  width={24}
                  height={24}
                  alt="google logo"
                />
                {type == 'sign-in' ? 'Sign-in' : 'Sign-up'} with Google
                {OAuthLoading && (
                  <Image
                    src="/assets/icons/loader.svg"
                    alt="loader"
                    width={24}
                    height={24}
                    className="ml-2 animate-spin"
                  />
                )}
              </Button>
            )}
          </div>
          {errorMessage && <p className="error-message">*{errorMessage}</p>}
          <div className="body-2 flex justify-center">
            <p className="text-white">
              {type === 'sign-in'
                ? "Don't have an account?"
                : 'Already have an account?'}
            </p>
            <Link
              href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
              className="ml-1 font-medium text-white"
            >
              {' '}
              {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
            </Link>
          </div>
        </form>
      </Form>

      {accountId && (
        <OtpModal email={form.getValues('email')} accountId={accountId} />
      )}
    </>
  );
};

const AuthFormWrapper = ({ type }: { type: FormType }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthForm type={type} />
    </Suspense>
  );
};

export default AuthFormWrapper;
