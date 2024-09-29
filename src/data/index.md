---
layout: PageLayout
components:
  - type: TextSection
    hasBorder: true
    text: >
      Primarily full stack **web** developer with some experience making native mobile applications.


      Traveling [Forgotten Realms](https://en.wikipedia.org/wiki/Forgotten_Realms), adore driving everything
      [has wheels](https://ribachenko.com/assets/plane.jpg), yet another [Apple](https://www.apple.com/) fanboy.


      Originally from [Vinnytsia, Ukraine](https://www.google.com/maps/search/?api=1&query=49.233243,28.47012).
      If you want make surprise but don't know what to present me, take a look at my [wishlist page](/wishlist).
      My name pronunciation is tricky thanks to the cyrillic-latin transliteration, you can hear the right
      version [here](/sounds/name.mp3).


      **Staff Software Engineer** @ [Netlify](https://netlify.com/).

      Read more in my [CV](/cv).
  - type: CardsListSection
    title: Projects
    hasBorder: true
    cards:
      - title: Stackbit
        description: Easiest way to create your own site with the best tools is Stackbit - first open, complete platform for the Jamstack
        image: /assets/projects/stackbit.png
        imageDark: /assets/projects/stackbit-dark.png
        href: https://stackbit.com
      - title: Yuliia Fishka
        description: Food expert & blogger, author of food courses and my beloved wife. I'm providing IT support for all projects
        image: /assets/projects/julia.png
        imageDark: /assets/projects/julia-dark.png
        href: https://yuliiafishka.com
      - title: Sprut
        description: Taxi ordering service in Ukraine. Available for iOS and Android, and also there are separate apps for drivers
        image: /assets/projects/sprut.png
        href: https://sprut.ua
      - title: Open source contributions
        description: My open source contributions on Github
        image: /assets/projects/github.png
        imageDark: /assets/projects/github-dark.png
        href: https://github.com/vitaliyr?tab=repositories
  - type: MastodonFeedSection
    title: Mastodon
    hasBorder: true
    limit: 10
    titleSlot:
      type: Link
      icon: mastodon
      url: https://mastodon.social/@Salen
      newTab: true
      isPlain: true
      rel: me
  - type: PostsFeedSection
    title: Posts
    titleSlot:
      type: Link
      icon: rss
      url: /rss
      newTab: true
      isPlain: true
      isHiddenPrint: true
---
