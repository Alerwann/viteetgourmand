/** @format */

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import Loading from '../loading/Loading';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

interface MenuVolume {
  _id: string;
  totalOrders: number;
  totalQuantity: number;
}

interface MenuTurnover {
  _id: string;
  turnover: number;
}

interface StatsData {
  success: boolean;
  volumeByMenu: MenuVolume[];
  turnoverByMenu: MenuTurnover[];
}

export default function DashboardStats() {
  const [chartData, setChartData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  // États pour les filtres
  const [selectedMenu, setSelectedMenu] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSyncAndFetch = async () => {
    setLoading(true);
    try {
      // 1. Déclencher la synchronisation MySQL -> MongoDB
      await fetch('http://localhost:8000/api/sync.php');

      // 2. Récupérer les statistiques à jour
      const params = new URLSearchParams();
      if (selectedMenu) params.append('menuId', selectedMenu);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const url = `http://localhost:8000/api/stats.php${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url);
      const data: StatsData = await res.json();

      if (data.success) {
        setChartData(data);
      }
    } catch (err) {
      console.error('Erreur lors de la synchronisation/récupération :', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSyncAndFetch();
  }, [selectedMenu, startDate, endDate]);

  if (!chartData && loading) return <Loading />;
  if (!chartData)
    return (
      <div className="p-6 text-center text-red-500">
        Impossible de charger les données.
      </div>
    );

  const volumeLabels = chartData.volumeByMenu.map((item) => item._id);
  const volumeCounts = chartData.volumeByMenu.map((item) => item.totalOrders);

  const volumeConfig = {
    labels: volumeLabels,
    datasets: [
      {
        label: 'Nombre de commandes',
        data: volumeCounts,
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const turnoverLabels = chartData.turnoverByMenu.map((item) => item._id);
  const turnoverValues = chartData.turnoverByMenu.map((item) => item.turnover);

  const turnoverConfig = {
    labels: turnoverLabels,
    datasets: [
      {
        label: "Chiffre d'affaires (€)",
        data: turnoverValues,
        backgroundColor: [
          'rgba(16, 185, 129, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(239, 68, 68, 0.6)',
          'rgba(139, 92, 246, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">
        Tableau de bord - Statistiques
      </h1>

      {/* Barre de Filtres */}
      <div className="bg-white p-4 rounded-xl shadow-md flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filtrer par période (Début)
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filtrer par période (Fin)
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID du Menu (optionnel)
          </label>
          <input
            type="number"
            placeholder="ex: 1"
            value={selectedMenu}
            onChange={(e) => setSelectedMenu(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 text-sm w-32"
          />
        </div>
        <div className="ml-auto flex gap-2">
          <button
            onClick={handleSyncAndFetch}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Synchronisation...' : '🔄 Actualiser / Synchroniser'}
          </button>
          <button
            onClick={() => {
              setSelectedMenu('');
              setStartDate('');
              setEndDate('');
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Popularité des Menus (Volume)
          </h2>
          <div className="h-64 flex justify-center">
            <Bar
              data={volumeConfig}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Chiffre d'affaires par Menu
          </h2>
          <div className="h-64 flex justify-center">
            <Doughnut
              data={turnoverConfig}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
