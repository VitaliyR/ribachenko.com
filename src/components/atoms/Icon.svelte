<script lang="ts" context="module">
  import DaynightStrokeIcon from '../../assets/daynight-stroke.svg';
  import DownloadIcon from '../../assets/download.svg';
  import EmailStrokeIcon from '../../assets/email-stroke.svg';
  import EmailIcon from '../../assets/email.svg';
  import FacebookIcon from '../../assets/facebook.svg';
  import GithubStrokeIcon from '../../assets/github-stroke.svg';
  import GithubIcon from '../../assets/github.svg';
  import GlobeStrokeIcon from '../../assets/globe-stroke.svg';
  import GlobeIcon from '../../assets/globe.svg';
  import HomeStrokeIcon from '../../assets/home-stroke.svg';
  import HomeIcon from '../../assets/home.svg';
  import InstagramIcon from '../../assets/instagram.svg';
  import LinkedinStrokeIcon from '../../assets/linkedin-stroke.svg';
  import LinkedinIcon from '../../assets/linkedin.svg';
  import PhoneStrokeIcon from '../../assets/phone-stroke.svg';
  import PinStrokeIcon from '../../assets/pin-stroke.svg';
  import PinIcon from '../../assets/pin.svg';
  import PrintIcon from '../../assets/print.svg';
  import RssIcon from '../../assets/rss.svg';
  import ShareIcon from '../../assets/share.svg';
  import SkillsIcon from '../../assets/skills.svg';
  import SkypeStrokeIcon from '../../assets/skype-stroke.svg';
  import StackbitIcon from '../../assets/stackbit.svg';
  import TelegramStrokeIcon from '../../assets/telegram-stroke.svg';
  import TwitterIcon from '../../assets/twitter.svg';

  const ICONS = {
    'daynight-stroke': DaynightStrokeIcon,
    download: DownloadIcon,
    'email-stroke': EmailStrokeIcon,
    email: EmailIcon,
    facebook: FacebookIcon,
    'github-stroke': GithubStrokeIcon,
    github: GithubIcon,
    'globe-stroke': GlobeStrokeIcon,
    globe: GlobeIcon,
    'home-stroke': HomeStrokeIcon,
    home: HomeIcon,
    instagram: InstagramIcon,
    'linkedin-stroke': LinkedinStrokeIcon,
    linkedin: LinkedinIcon,
    'phone-stroke': PhoneStrokeIcon,
    'pin-stroke': PinStrokeIcon,
    pin: PinIcon,
    print: PrintIcon,
    rss: RssIcon,
    share: ShareIcon,
    skills: SkillsIcon,
    'skype-stroke': SkypeStrokeIcon,
    stackbit: StackbitIcon,
    'telegram-stroke': TelegramStrokeIcon,
    twitter: TwitterIcon
  };

  export type IconName = keyof typeof ICONS;
</script>

<script lang="ts">
  export let icon: IconName;

  let className = '';
  export { className as class };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $: component = ICONS[icon] as any;
</script>

<svelte:component this={component} class={className} />
