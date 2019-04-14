import { TennisEventInfo } from '../../../client/TennisEvents';

// 将来対応 とりあえずの適当実装
export type ViewingFilter = Partial<
  Record<
    keyof Pick<
      TennisEventInfo,
      'title' | 'organizer' | 'sex' | 'placeName' | 'prefecture' | 'courtCount'
    >,
    string
  >
> & {
  [key: string]: string | undefined;
};
