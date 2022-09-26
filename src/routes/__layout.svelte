<script lang="ts">
  import { browser } from '$app/env';
  import { isSupportWebP } from '../lib/utils';

  if (browser) {
    isSupportWebP().then((result) => {
      document.body.classList.toggle('supports-web-p', result);
    });
  }
</script>

<slot />

<style lang="scss" global>
  @import '../styles/base';
</style>
