// Demo service for development
export const demoService = {
  resetDatabase: async () => {
    // Mock reset function
    localStorage.clear();
    console.log('Demo database reset');
  },
  
  generateTestData: async () => {
    // Mock test data generation
    console.log('Test data generated');
  },
  
  exportData: async () => {
    // Mock export function
    const data = {
      timestamp: new Date().toISOString(),
      data: 'mock_export_data'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'garage_export.json';
    a.click();
    URL.revokeObjectURL(url);
  }
};