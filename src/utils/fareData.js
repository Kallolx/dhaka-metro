export const stations = [
  'Uttara North', 'Uttara Center', 'Uttara South', 'Pallabi',
  'Mirpur 11', 'Mirpur 10', 'Kazipara', 'Shewrapara',
  'Agargaon', 'Bijoy Sarani', 'Farmgate', 'Karwan Bazar',
  'Shahbag', 'Dhaka University', 'Bangladesh Secretariat',
  'Motijheel', 'Kamalapur'
];

export function calculateFare(start, destination) {
  if (!start || !destination) return null;
  
  const startIndex = stations.indexOf(start);
  const endIndex = stations.indexOf(destination);
  const stationCount = Math.abs(endIndex - startIndex);
  
  // Base fare is 20 tk, plus 5 tk per station
  return Math.max(20, 20 + (stationCount * 5));
}

export function calculateTime(start, destination) {
  if (!start || !destination) return null;
  
  const startIndex = stations.indexOf(start);
  const endIndex = stations.indexOf(destination);
  const stationCount = Math.abs(endIndex - startIndex);
  
  // Assume 3 minutes per station
  return stationCount * 3;
} 