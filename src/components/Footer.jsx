const Footer = () => {
  return (
    <footer className="flex items-center justify-center bg-custom-secondary/50 p-8 text-lg text-custom-text">
      <div>
        Copyright&copy; 2024{" "}
        <a
          href="https://github.com/Abdelkrim-Saouchi/blog_frontend"
          target="_blank"
          className="group inline-flex items-center gap-3 font-bold"
        >
          Krimothiazine
          <span className="icon-[akar-icons--github-fill] group-hover:animate-bounce"></span>
        </a>
      </div>
    </footer>
  );
};
export default Footer;
