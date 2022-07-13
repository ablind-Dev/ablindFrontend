interface artworkProps {
  artworks: Array<string>;
}

export default function ArtistDetailArtworksComponent(props: artworkProps) {
  const { artworks } = props;
  return (
    <>
      {artworks.map((artwork, index) => (
        <div className="card" key={index}>
          <style jsx>{`
            .card {
              background-image: url(${artwork});
              background-size: cover;
              background-position: center;
              width: 200px;
              height: 300px;
              border-radius: 10px;
              box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
                0 3px 10px -3px rgba(0, 0, 0, 0.137),
                0 -1px 8px -1px rgba(0, 0, 0, 0.025);
            }
          `}</style>
        </div>
      ))}
    </>
  );
}
