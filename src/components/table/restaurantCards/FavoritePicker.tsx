import FavoriteCard from './FavoriteCard';
import { useEffect, useState } from 'react';
import { NavLink, Button, Footer } from '@mantine/core'
import { IconChevronRight} from '@tabler/icons'
import { useRouter } from 'next/router';

export default function FavoritePicker({ ids, votes, setVotes, listData}: any) {
  const router = useRouter()
  const [favorite, setFavorite] = useState();
  const [localVotes, setLocalVotes] = useState(votes)

  function handleFavoriteChoice() {
    if (favorite) {
      setLocalVotes((votes: any) => {
        const updatedVotes = {
          ...votes,
          [favorite]: 1.5,
        };
        setVotes(updatedVotes); // Call setVotes with the updated localVotes
        
        router.push('/voting/results')
      });
    }
  }
  useEffect(() => {
    console.log(votes);
  }, [votes]);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Pick your favorite restaurant!</h1>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {ids.map((id: string) => (
          <FavoriteCard
            key={id}
            id={id}
            listData={listData}
            favorite={favorite}
            setFavorite={setFavorite}
          />
        ))}
      </div>
      {favorite !== undefined && (
        <Footer height={60} style={{position: 'fixed', bottom: 0, left: 0, right: 0 }}>

          <NavLink onClick={handleFavoriteChoice} active={true} color="red" label="Continue" rightSection={<IconChevronRight size="0.8rem" stroke={1.5}/>} />
        </Footer>
      )}
    </>
  );
}
