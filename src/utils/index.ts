// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createHmac } = require('crypto');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const JsDistance = require('js-distance');

export const computeInstance = (
  ALongitude: number,
  ALatitude: number,
  BLongitude: number,
  BLatitude: number,
): number => {
  if (ALongitude === 0 || ALatitude === 0) return 0;

  const distance = new JsDistance(ALatitude, ALongitude, BLatitude, BLongitude)
    .count()
    .toKilometre();

  return distance;
};

export const convertKMToKmStr = (km: number): string => {
  if (!km) return '';

  if (km > 1) {
    return km.toFixed(2) + 'km';
  } else {
    return (km * 1000).toFixed(0) + 'm';
  }
};

export const hash = (str: string): string => {
  return createHmac('sha256', 'jacklove' + new Date().getTime())
    .update(str)
    .digest('hex');
};
