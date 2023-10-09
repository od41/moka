import { ReactReader } from 'react-reader'
import useLocalStorageState from 'use-local-storage-state'

interface ReaderProps {
    url: string;
    title: string;
}

export const EpubReader = ({url, title}: ReaderProps) => {
  const [location, setLocation] = useLocalStorageState<string | number>(
    'moka-continue-reading',
    {
      defaultValue: 0,
    }
  )
  return (
    <div className='h-[90vh]'>
      <ReactReader
        url={url}
        title={title}
        showToc={true}
        location={location}
        locationChanged={(loc: string) => setLocation(loc)}
      />
    </div>
  )
}