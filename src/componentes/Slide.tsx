// src/components/Slide.tsx
interface SlideProps {
  content: {
    title: string;
    body: string;
    image?: string;
  };
}

const Slide = ({ content }: SlideProps) => {
  return (
    <div className="slide">
      <h2>{content.title}</h2>
      <p>{content.body}</p>
      {content.image && <img src={content.image} alt={content.title} />}
    </div>
  );
};

export default Slide;