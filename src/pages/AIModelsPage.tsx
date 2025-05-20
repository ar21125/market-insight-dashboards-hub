
import React from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import AIModelCatalog from '@/components/AIModelCatalog';

const AIModelsPage = () => {
  return (
    <DefaultLayout>
      <div className="container mx-auto p-6">
        <AIModelCatalog />
      </div>
    </DefaultLayout>
  );
};

export default AIModelsPage;
