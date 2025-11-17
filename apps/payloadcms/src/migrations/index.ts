import * as migration_20251112_152020 from './20251112_152020';

export const migrations = [
  {
    up: migration_20251112_152020.up,
    down: migration_20251112_152020.down,
    name: '20251112_152020'
  },
];
