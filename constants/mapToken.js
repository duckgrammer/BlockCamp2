export const getTokenAddress = (name) => {
    return (
      {
        balancer: '0xba100000625a3754423978a60c9317c58a424e3d',
        sushiswap: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
      }[name || ''] || name
    );
  };