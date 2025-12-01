import * as migration_20251112_152020 from './20251112_152020';
import * as migration_20251120_164415 from './20251120_164415';
import * as migration_20251121_093015 from './20251121_093015';

export const migrations = [
  {
    up: migration_20251112_152020.up,
    down: migration_20251112_152020.down,
    name: '20251112_152020',
  },
  {
    up: migration_20251120_164415.up,
    down: migration_20251120_164415.down,
    name: '20251120_164415',
  },
  {
    up: migration_20251121_093015.up,
    down: migration_20251121_093015.down,
    name: '20251121_093015'
  },
];
