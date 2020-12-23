import ISettings from '@/interfaces/ISettings';

declare module 'settings.json' {
  const value: ISettings;
  export default value;
}
