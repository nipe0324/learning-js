import { useQuery, gql } from '@apollo/client';

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

const Locations = () => {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.locations.map(({ id, name, description, photo }) => (
    <div key={id}>
      <h3>{name}</h3>
      <img width="400" height="250" alt="location-reference" src={`${photo}`} />
      <br />
      <b>About this location:</b>
      <p>{description}</p>
      <br />
    </div>
  ));
}

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
    failedBook {
      id
    }
  }
`

const Books = () => {
  const { loading, error, data } = useQuery(GET_BOOKS, {
    errorPolicy: 'none',
  });

  if (loading) return <p>Loading...</p>;

  // console.log(data);
  // console.log(error);
  // console.log('network', error && error.networkError)
  // console.log('graphQLErrors', error && error.graphQLErrors)

  if (error) return <p>Error : {error.message}</p>;

  return data.books.map(({ id, title, author }) => (
    <div key={id}>
      <h3>{title}</h3>
      <p>author: {author}</p>
      <br />
    </div>
  ));
}

export default function App() {
  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2>My first Apollo app 🚀</h2>
      <br />
      {/* <Locations /> */}
      <Books />
    </div>
  );
}
