import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Stack, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { styled } from '@mui/system';
import Head from 'next/head';

const StyledFormLabel = styled('label')({
  margin: '0px',
});

// バリデーションルール
// バリデーションスキーマを構築する
const schema = yup.object({
  email: yup
    .string()
    .required('このフィールドは必須項目です')
    .email('正しいメールアドレス入力してください'),
  name: yup.string().required('このフィールドは必須項目です'),
  password: yup
    .string()
    .required('このフィールドは必須項目です')
    .min(6, 'パスワードは6文字以上で入力してください')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].*$/,
      'パスワードは英数字と記号を組み合わせて下さい'
    ),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // フォーム送信時の処理
  const onSubmit = (data) => {
    // バリデーションチェックOK！なときに行う処理を追加
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>新規登録</title>
      </Head>
      <Container
        maxWidth="sm"
        sx={{
          pt: 5,
          alignItems: 'center',
          height: '100%',
          display: 'flex',
        }}
      >
        <Stack spacing={3} sx={{ flex: 1 }}>
          <h1>アカウント作成</h1>
          <StyledFormLabel>メールアドレス</StyledFormLabel>
          <TextField
            required
            type="email"
            {...register('email')}
            error={'email' in errors}
            helperText={errors.email?.message}
          />
          <StyledFormLabel>ユーザー名</StyledFormLabel>
          <TextField
            required
            {...register('name')}
            error={'name' in errors}
            helperText={errors.name?.message}
          />
          <StyledFormLabel>パスワード</StyledFormLabel>
          <TextField
            required
            type="password"
            {...register('password')}
            error={'password' in errors}
            helperText={errors.password?.message}
          />
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={handleSubmit(onSubmit)}
          >
            作成
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default App;
