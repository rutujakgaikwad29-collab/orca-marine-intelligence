import { useState } from 'react';
import { mockDataSources } from '../data/mockDataSources';
import { DataSourcesHeader } from '../components/datasources/DataSourcesHeader';
import { DataPillarCard } from '../components/datasources/DataPillarCard';
import { DataFusionPipeline } from '../components/datasources/DataFusionPipeline';
import { DataHealthTable } from '../components/datasources/DataHealthTable';

export const DataSources = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12 fade-in">
      {/* 1. HEADER */}
      <section>
        <DataSourcesHeader onRefresh={handleRefresh} refreshing={refreshing} />
      </section>

      {/* 2 & 3. 5 CORE DATA PILLAR CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DataPillarCard pillar={mockDataSources.satellite} />
        <DataPillarCard pillar={mockDataSources.weather} />
        <DataPillarCard pillar={mockDataSources.ocean} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DataPillarCard pillar={mockDataSources.fisheries} />
        <DataPillarCard pillar={mockDataSources.boatIoT} />
      </section>

      {/* 4. ORCA MULTI-STREAM DATA FUSION PIPELINE */}
      <section>
        <DataFusionPipeline />
      </section>

      {/* 5. LIVE DATA STREAM HEALTH TABLE */}
      <section>
        <DataHealthTable />
      </section>
    </div>
  );
};
