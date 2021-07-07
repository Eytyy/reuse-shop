import BreakdownDetails from '../components/BreakdownDetails';

export default function resolveInput(type) {
  if (type.name === 'string' && type.options) {
    if (type.options.breakdownDetails) return BreakdownDetails;
  }
}
