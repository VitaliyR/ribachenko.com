<script context="module" lang="ts">
  import type { IconName } from '../atoms/Icon.svelte';

  export type Contact = {
    icon: IconName;
    url: string;
    text: string;
  };

  export type SkillGroup = {
    title: string;
    skills: string[];
  };

  export type Language = {
    name: string;
    level: string;
  };

  export type Experience = {
    dateStart: Date;
    dateEnd?: Date;
    location: string;
    name: string;
    description: string;
    position: string;
  };

  export type Education = {
    name: string;
    degree: string;
    dateStart: Date;
    dateEnd?: Date;
    description: string;
  };
</script>

<script lang="ts">
  import { upperFirst } from 'lodash-es';
  import dayjs from 'dayjs';
  import SEO from '../atoms/SEO.svelte';
  import Picture from '../atoms/Picture.svelte';
  import Link from '../atoms/Link.svelte';
  import CVDownload from '../atoms/CVDownload.svelte';
  import ThemeButton from '../atoms/ThemeButton.svelte';
  import { parseMarkdown } from '$lib/md-utils';
  import { metaStore } from '../../lib/stores';
  import siteConfig from '../../data/config.json';

  export let slug: string;
  export let body: string;
  export let data: {
    name: string;
    about: string;
    logo: string;
    birthday: Date;
    careerStartDate: Date;
    gender: 'male' | 'female';
    contacts?: Contact[];
    languages?: Language[];
    skills?: SkillGroup[];
    experiences?: Experience[];
    educations?: Education[];
    pdf?: {
      label: string;
      url: string;
      description?: string;
    }[];
    etc?: string;
  };

  let mode: 'full' | 'short';
  $: mode = $metaStore.searchParams.has('short') ? 'short' : 'full';

  const replaceContactInfo = (text: string) =>
    text
      .replaceAll('%home.city%', siteConfig.home.city)
      .replaceAll('%home.country%', siteConfig.home.country)
      .replaceAll('%home.lat%', siteConfig.home.lat.toString())
      .replaceAll('%home.lng%', siteConfig.home.lng.toString())
      .replaceAll('%currentPlace.city%', siteConfig.currentPlace.city)
      .replaceAll('%currentPlace.country%', siteConfig.currentPlace.country)
      .replaceAll('%currentPlace.lat%', siteConfig.currentPlace.lat.toString())
      .replaceAll('%currentPlace.lng%', siteConfig.currentPlace.lng.toString());
</script>

<SEO {slug} />
<div class="page">
  <ThemeButton class="theme-button" />
  <header class="page-header">
    <div>
      <h1 class="page-header__title">{data.name}</h1>
      <h2 class="page-header__role">{data.about}</h2>
      <p class="page-header__description">
        {#if mode === 'full'}
          <span><span>{upperFirst(data.gender)}</span>, <span>{new Date(Date.now() - data.birthday.getTime()).getFullYear() - 1970}</span></span>
          <br />
        {/if}
        <span>{new Date(Date.now() - data.careerStartDate.getTime()).getFullYear() - 1970}</span> years experience
      </p>
    </div>
    {#if mode === 'full'}
      <a class="link link--plain" href={data.logo} target="_blank" rel="noreferrer">
        <Picture class="page-header__avatar" url={data.logo} alt={data.name} />
      </a>
    {/if}
  </header>
  <main class="main-container">
    <div class="two-column-container">
      <div class="main-column">
        <section class="section about-content">
          {@html body}
        </section>

        <section class="section">
          <h2 class="section-title">Skills</h2>
          <ul class="list skill-groups-list">
            {#each data.skills ?? [] as skill}
              <li class="skill-group">
                <article class="skill">
                  <header class="skill-header">{skill.title}</header>
                  <ul class="list skill-list">
                    {#each skill.skills as skillName}
                      <li>{skillName}</li>
                    {/each}
                  </ul>
                </article>
              </li>
            {/each}
          </ul>
        </section>
      </div>

      <div class="main-column">
        <section class="section">
          <h2 class="section-title contacts-title">Contacts</h2>
          <ul class="list contacts-list">
            {#each data.contacts ?? [] as contact}
              <li>
                <Link
                  class="contact-link link--plain link--ic"
                  newTab
                  url={replaceContactInfo(contact.url)}
                  title={replaceContactInfo(contact.text)}
                  icon={contact.icon}
                />
              </li>
            {/each}
          </ul>
        </section>

        <section class="section">
          <h2 class="section-title">Languages</h2>
          <ul class="list languages-list">
            {#each data.languages ?? [] as language}
              <li>
                <div class="language-name">{language.name}</div>
                <div>{language.level}</div>
              </li>
            {/each}
          </ul>
          <div class="download-sidebar-container">
            <CVDownload pdf={data.pdf} name={data.name} isVertical />
          </div>
        </section>
      </div>
    </div>

    <div>
      <section class="section break-page">
        <h2 class="section-title">Experience</h2>
        <ul class="list">
          {#each data.experiences ?? [] as experience}
            <li>
              <article class="experience" class:experience--present={!experience.dateEnd}>
                <header>
                  <div>
                    <span class="experience-header-title">
                      <span>{experience.name}</span>
                      —
                      <span>{experience.position}</span>
                    </span>
                    <span> — {experience.location}</span>
                  </div>
                  <div class="experience-header-date">
                    {dayjs(experience.dateStart).format('MMMM YYYY')} - {experience.dateEnd ? dayjs(experience.dateEnd).format('MMMM YYYY') : 'Present'}
                  </div>
                </header>
                <div class="experience-description">
                  {@html parseMarkdown(experience.description)}
                </div>
              </article>
            </li>
          {/each}
        </ul>
      </section>

      <section class="section">
        <h2 class="section-title">Education</h2>
        <ul class="list">
          {#each data.educations ?? [] as education}
            <li>
              <article class="experience" class:experience--present={true}>
                <header>
                  <div class="experience-header-title">
                    <span>{education.name}</span>
                    <span> — {education.degree}</span>
                  </div>
                  <div class="experience-header-date">
                    {dayjs(education.dateStart).format('YYYY')} - {education.dateEnd ? dayjs(education.dateEnd).format('YYYY') : 'Present'}
                  </div>
                </header>
                <div class="experience-description">
                  {@html parseMarkdown(education.description)}
                </div>
              </article>
            </li>
          {/each}
        </ul>
      </section>

      {#if data.etc && mode === 'full'}
        <section class="section">
          <h2 class="section-title">Etc</h2>
          <div class="etc-content">
            {@html parseMarkdown(data.etc)}
          </div>
        </section>
      {/if}

      <section class="section footer">
        <CVDownload pdf={data.pdf} name={data.name} />
      </section>
    </div>
  </main>
</div>

<style lang="scss">
  @page {
    margin: 0.8cm 0;
  }

  .page {
    max-width: 1000px;
    margin: 0 auto;
    padding: calc(var(--space) * 8) calc(var(--space) * 3);
    font: var(--typography-body-cv);

    @media (--big-phone) {
      padding-top: calc(var(--space) * 4);
    }

    @media print {
      font: var(--typography-body-cv-print);
      padding: 0 calc(var(--space) * 6);
    }

    :global(.contact-link) {
      display: flex;
      align-items: center;

      @media print {
        color: var(--color-accent-dark);
      }
    }

    :global(.contact-link svg) {
      margin-right: var(--space);
      width: 20px;
      height: 20px;
    }

    :global(.contact-link:hover span) {
      text-decoration: dashed;
    }

    :global(.theme-button) {
      width: 24px;
      height: 24px;
      position: fixed;
      left: calc(var(--space) * 2);
      bottom: calc(var(--space) * 2);
      opacity: 0.5;
      will-change: opacity, fill;
      transition: opacity 0.5s ease-in-out, fill 0.2s ease-in-out;
      transition: opacity var(--transition), fill var(--transition);
      color: var(--color-text-accent);

      &:hover {
        opacity: 1;
      }
    }
  }

  .main-container {
    display: flex;
    flex-flow: column nowrap;
  }

  .two-column-container {
    display: flex;
    flex-flow: row nowrap;

    @media (--phone) {
      flex-flow: column nowrap;
    }
  }

  .main-column {
    &:not(:last-child) {
      margin-right: calc(var(--space) * 3);

      @media (--phone) {
        margin-right: 0;
      }
    }

    &:last-child {
      min-width: 180px;
    }
  }

  .section {
    margin: calc(var(--space) * 3) 0;

    @media (--phone) {
      margin: 0;
    }
  }

  .page-header {
    border-bottom: 3px solid var(--color-accent);
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    @media (--phone) {
      flex-flow: column-reverse nowrap;
      align-items: center;
      text-align: center;
    }

    @media print {
      border-bottom-color: var(--color-accent-dark);
    }

    &__title,
    &__role {
      color: var(--color-accent);
      margin: 0;
      font: var(--typography-title-l);

      @media print {
        font: var(--typography-title);
        color: var(--color-accent-dark);
      }
    }

    &__role {
      font: var(--typography-title-thin);

      @media print {
        font: var(--typography-title-thin-s);
      }
    }

    &__description {
      color: var(--color-text-accent);
    }

    :global(.page-header__avatar) {
      width: 140px;
      height: 140px;
      border-radius: 70px;
      border: 5px solid var(--color-accent);

      @media (--phone) {
        margin-bottom: var(--space);
      }

      @media print {
        width: 120px;
        height: 120px;
        border-radius: 60px;
        border-color: var(--color-accent-dark);
      }
    }
  }

  .section-title {
    font: var(--typography-title-s);
    color: var(--color-accent);

    @media print {
      color: var(--color-accent-dark);
    }
  }

  .contacts-title {
    display: none;

    @media (--phone) {
      display: block;
    }
  }

  .break-page {
    @media print {
      break-before: page;
      margin-top: 0;
    }
  }

  .list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .contacts-list {
    li {
      margin-bottom: var(--space);
    }
  }

  .languages-list {
    li {
      margin-bottom: calc(var(--space) * 3);
    }
  }

  .language-name {
    font: var(--typography-body-cv-strong);
    color: var(--color-text-accent);

    @media print {
      font: var(--typography-body-cv-strong-print);
    }
  }

  .skill-groups-list {
    column-count: 2;
  }

  .skill-group {
    break-inside: avoid-column;
  }

  .download-sidebar-container {
    @media (--phone) {
      display: none;
    }
  }

  .skill {
    margin-bottom: calc(var(--space) * 2);

    &-header {
      font: var(--typography-body-cv-strong);
      color: var(--color-text-accent);
      margin-bottom: var(--space);

      @media print {
        font: var(--typography-body-cv-strong-print);
      }
    }
  }

  .skill-list {
    li {
      display: inline-block;
      margin-right: var(--space);

      &:not(:last-child):after {
        display: inline-block;
        content: '•';
        margin-left: var(--space);
      }
    }
  }

  .experience {
    margin-bottom: calc(var(--space) * 5);
    color: var(--color-text-accent);
    opacity: 0.6;
    transition: opacity var(--transition);

    &-header {
      &-title {
        font: var(--typography-body-cv-strong);

        @media print {
          font: var(--typography-body-cv-strong-print);
        }
      }

      &-date {
        margin-top: var(--space);
      }
    }

    &-description {
      margin: calc(var(--space) * 2) 0;
    }

    &--present,
    &:hover {
      opacity: 1;
    }

    @media print {
      opacity: 1;
      margin-bottom: calc(var(--space) * 3);
      box-decoration-break: clone;
    }
  }

  .about-content,
  .etc-content {
    color: var(--color-text-accent);
  }

  .footer {
    display: flex;
    justify-content: center;
    margin-top: calc(var(--space) * 6);
  }
</style>
