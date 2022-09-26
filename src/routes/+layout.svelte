<script lang="ts">
  import { browser } from '$app/environment';
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
