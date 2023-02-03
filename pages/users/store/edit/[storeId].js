import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import StoreForm from '../../../../components/store/StoreForm';
import { getSingleStore } from '../../../../utils/data/storeData';

export default function EditStore() {
  const router = useRouter();
  const [editStore, setEditStore] = useState({});
  const { storeId } = router.query;

  useEffect(() => {
    getSingleStore(storeId).then(setEditStore);
  }, [storeId]);

  return (
    <StoreForm store={editStore} />
  );
}
