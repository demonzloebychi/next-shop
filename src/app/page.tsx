

export const metadata: object = {
  title: 'Главная',
  description: 'Главная страница сайта',
  openGraph: {
      title: 'Главная',
      description: 'Главная страница сайта',
  }
}

  const fetchUsers = async () => {
    const response = await fetch(`http://localhost:27017/users`)

    const data = await response.json();

    return data
  }
  


export default function Home() {


  return (
    <>
      <h1>Добро пожаловать!</h1>
    </>
  );
}
