import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.png'
import { site } from '../content/site'

export default function Home() {
  return (
    <div>
      <section className="homeHero">
        <div className="container">
          <div className="homeHeroFrame" role="img" aria-label="Featured business search">
            <div className="homeHeroPhoto" style={{ backgroundImage: `url(${heroImg})` }} aria-hidden="true" />
            <div className="homeHeroTint" aria-hidden="true" />

            <div className="homeHeroBottom">
              <div className="businessTitleRow">
                <span className="businessGlyph" aria-hidden="true">
                  ⌂
                </span>
                <span className="businessTitle">BUSINESS</span>
              </div>

              <div className="businessSearchPanel" aria-label="Business search">
                <div className="businessSearchTabs" aria-hidden="true">
                  <span className="bizTabActive">Business For Sale</span>
                  <span className="bizTab">Business Search</span>
                  <span className="bizTab">Selling Your Business</span>
                </div>

                <div className="businessSearchRow">
                  <div className="bizField">
                    <label className="bizLabel" htmlFor="industry">
                      Industry
                    </label>
                    <select id="industry" className="bizSelect" defaultValue="Any">
                      <option>Any</option>
                      <option>HVAC & Services</option>
                      <option>Cleaning / Franchise</option>
                      <option>Distribution / Logistics</option>
                    </select>
                  </div>

                  <div className="bizField">
                    <label className="bizLabel" htmlFor="minPrice">
                      Min price
                    </label>
                    <select id="minPrice" className="bizSelect" defaultValue="0">
                      <option value="0">Any</option>
                      <option value="200000">$200k+</option>
                      <option value="500000">$500k+</option>
                      <option value="1000000">$1M+</option>
                    </select>
                  </div>

                  <div className="bizSearchButtonWrap">
                    <button className="bizSearchButton" type="button">
                      <span className="bizSearchButtonIcon" aria-hidden="true">
                        🔍
                      </span>
                      SEARCH
                    </button>
                  </div>
                </div>

                <p className="bizHelper">
                  {site.tagline} Tell us your goals and we’ll match you with diligence-ready opportunities.
                </p>
              </div>
            </div>
          </div>

          <div className="homeHeroCtaRow">
            <Link className="btn btnPrimary" to="/contact">
              Contact Us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

