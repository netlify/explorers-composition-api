<template>
  <footer class="app-footer">
    <p class="app-footer-wrapper nes-container is-dark">
      Powered by
      <a
        class="app-footer-link"
        href="https://www.netlify.com/?utm_source=github&utm_medium=gigavue-bh&utm_campaign=devex"
      >
        <img
          class="app-footer-logo"
          src="/images/netliheart.svg"
          alt="Netlify Heart Logo"
        />
        Netlify
      </a>
    </p>
  </footer>
</template>

<style>
.app-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
}

.app-footer-wrapper {
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  font-weight: 500;
}

.app-footer-link {
  display: flex;
  align-items: center;
  padding: 0 5px;
  text-decoration: none;
  color: #fff;
}

.app-footer-link:hover {
  text-decoration: underline;
}

.app-footer-link:first-child,
.app-footer-link:last-child {
  padding-right: 0;
}

.app-footer-logo {
  width: 24px;
  margin-right: 10px;
  margin-left: 5px;
}
</style>
