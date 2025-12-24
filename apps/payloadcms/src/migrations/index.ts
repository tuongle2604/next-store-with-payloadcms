import * as migration_20251112_152020 from './20251112_152020';
import * as migration_20251120_164415 from './20251120_164415';
import * as migration_20251121_093015 from './20251121_093015';
import * as migration_20251216_190249 from './20251216_190249';
import * as migration_20251219_055459 from './20251219_055459';

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
    name: '20251121_093015',
  },
  {
    up: migration_20251216_190249.up,
    down: migration_20251216_190249.down,
    name: '20251216_190249',
  },
  {
    up: migration_20251219_055459.up,
    down: migration_20251219_055459.down,
    name: '20251219_055459'
  },
];
