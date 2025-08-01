import CatalogTile from "./CatalogTile";
import { catalogSections } from "@/lib/Products/Catalog";

export default function CatalogSection() {

  return (
    <>
      {
        catalogSections.map((section, index) => (
          <section className="pt-6" key={index} >
            <div className={`grid grid-cols-1
            md:${section.layout === "3-Tile" ? "grid-cols-3"
                : section.layout === "2-Tile" ? "grid-cols-2"
                  : "grid-cols-1"} 
              gap-6`}>
              {section.tiles.map((tile, i) => (
                <CatalogTile key={i} {...tile} />
              ))}
            </div>
          </section>
        ))
      }
    </>
  );
}