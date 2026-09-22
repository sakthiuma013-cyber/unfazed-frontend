import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useEntitlement = () => {
  const { user } = useContext(AuthContext);

  const verifyFeatureClearance = (featureKey) => {
    // Standard mock fallbacks that link structural gating decisions to the active session layer
    if (!user) return false;
    const tier = user.tier || 'free';
    
    const configurationMatrixMaps = {
      free: { client_limit: 5, chat: false, analytics: false },
      growth: { client_limit: 25, chat: true, analytics: false },
      premium: { client_limit: 999, chat: true, analytics: true }
    };

    return configurationMatrixMaps[tier]?.[featureKey] ?? false;
  };

  return { verifyFeatureClearance };
};
