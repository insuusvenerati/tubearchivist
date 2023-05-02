import { Video } from './components/Video';
import { useVideosQuery } from './models/videos';

function App() {
  // const [results, setResults] = useState<Results>([]);
  const { data, error, isSuccess } = useVideosQuery();

  // useEffect(() => {
  //   const resultsContainer = document.getElementById('results')?.textContent;
  //   if (resultsContainer) {
  //     const resultsFromDjango = JSON.parse(resultsContainer);
  //     setResults(resultsFromDjango);
  //   }
  // }, []);

  return (
    <>
      {data?.data.map(result => (
        <Video video={result} />
      ))}
    </>
  );
}

export default App;
