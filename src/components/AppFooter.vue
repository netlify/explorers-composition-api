<template>
  <footer class="app-footer">
    <p class="app-footer-wrapper nes-container is-dark">
      <span>Powered by</span>
      <a
        class="app-footer-link"
        href="https://www.netlify.com/?utm_source=deployed-app&utm_medium=launch-comp-bh&utm_campaign=devex"
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
  margin-bottom: 30px;
}

.app-footer-wrapper {
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  font-weight: 500;
}

.app-footer-wrapper > * {
  flex-shrink: 0;
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
