import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import styles from '../styles/Home.module.css'

import { useEffect, useState } from "react";

function Paragraph(props) {
  return (
    <>
      <p>{props.id}:{props.title}
      </p>
    </>
  );
}

function Card(props) {
  const [likes, setLikes] = useState(0);

  return (
    <div
      className="card col-4 d-flex justify-content-center text-dark"

    >
      <img
        src={props.src}
        className="card-img-top"
        style={{ width: "${likes}px" }}
        alt="..."
      />
      <div className="card-body">
        <Link href={{pathname: "pokemons/[id]", query: {id: props.id}}}>
          <h5 className="card-title link-primary">{props.title}</h5>
        </Link>
        <p className="card-text">{props.text}</p>
        {likes == 0 ? null : <p className="card-text">Likes {likes}</p>}
        {likes == 10 ? null : (
          <button
            onClick={() => {
              setLikes(likes + 1);
            }}
            href="#"
            className="btn btn-primary"
          >
            {props.buttonText}
          </button>
        )}
      </div>
    </div>
  );
}

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 20;

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&liimit=${limit}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setIsLoading(false);
        setPokemonList([...pokemonList, ...json["results"]]);
      })
  }, [offset]);

  function getIDFromPokemon(pokemon) {
    return pokemon.url.replace(
      "https://pokeapi.co/api/v2/pokemon/",
      ""
    ).replace("/", "");
  }
  return (
    <div className="App">
      <div className="contianer">
        <div className="row">
          {pokemonList.map((pokemon) => {
            const id = getIDFromPokemon(pokemon);
            return( 
              <Card
                key={id}
                id={id}
                title={pokemon["name"]}
                buttonText="like"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              />
            );
          })}
        </div>
        {isLoading == true ? <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div> : null }
        <div>
          <button onClick={() => { setOffset(offset + limit) }}>More</button>
        </div>
      </div>
    </div>
  );
}

export default App;

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Welcome to <Link href="/priceless"><a>Priceless</a></Link>
//         </h1>

//         <p className={styles.description}>
//           Get started by editing{' '}
//           <code className={styles.code}>pages/index.js</code>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h2>Documentation &rarr;</h2>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h2>Learn &rarr;</h2>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/canary/examples"
//             className={styles.card}
//           >
//             <h2>Examples &rarr;</h2>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//           >
//             <h2>Deploy &rarr;</h2>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <span className={styles.logo}>
//             <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
//           </span>
//         </a>
//       </footer>
//     </div>
//   )
// }
