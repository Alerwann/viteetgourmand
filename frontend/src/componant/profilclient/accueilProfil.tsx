/** @format */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import Loading from '../global/loading/Loading';
import FormIdentity from './modifIdentite';
import CommandeList from './commandeList';

export default function AccueilProfil() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  if (isLoading) return <Loading />;

  useEffect(() => {
    setLoading(true);
    if (!isAuthenticated) {
      navigate('/connect', { replace: true });
      return;
    }
    if (user?.role !== 'utilisateur') {
      navigate('/dashboard', { replace: true });
      return;
    }

    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-row m-10">
      <FormIdentity />
      <CommandeList />
    </div>
  );
}
