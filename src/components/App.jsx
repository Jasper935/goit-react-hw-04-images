import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchByName } from 'api/fetchByName';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from './Loader/Loader';
import { useState } from 'react';
import { useEffect } from 'react';
export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [imgForModal, setImgForModal] = useState('');

  useEffect(() => {
    if (!search) {
      return;
    }
    setLoader(true);

    fetchByName(search, page)
      .then(res => {
        if (res.data.hits.length === 0 || search.trim() === '') {
          toast.warning('Enter correct value');

          return;
        }

        setGallery(prSt => [...prSt, ...res.data.hits]);
        setTotalHits(res.data.totalHits);
      })
      .finally(() => setLoader(false));
  }, [page, search]);

  const getFirstPage = () => {
    setPage(1);
  };
  const getSearch = s => {
    setGallery([]);
    setSearch(s);
  };

  const openModal = img => {
    setImgForModal(img);
  };
  const onClick = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <Searchbar getSearch={getSearch} getFirstPage={getFirstPage} />
      {loader && <Loader />}
      <ToastContainer />
      {imgForModal && <Modal img={imgForModal} openModal={openModal} />}
      {gallery.length > 0 ? (
        <ImageGallery gallery={gallery} openModal={openModal} />
      ) : (
        <h2>Please, search an image</h2>
      )}
      {totalHits >= 12 * page && gallery.length > 0 && (
        <Button onClick={onClick} />
      )}
    </>
  );
};
