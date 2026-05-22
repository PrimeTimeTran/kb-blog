export default function Page() {
  return (
    <div className="page">
      <header>
        <nav>
          <div>
            <a href="/">Logo</a>

            <div>
              <input type="search" placeholder="Search" />
            </div>
          </div>

          <div>
            <a href="#">Home</a>
            <a href="#">My Network</a>
            <a href="#">Jobs</a>
            <a href="#">Messaging</a>
            <a href="#">Notifications</a>
          </div>

          <div>
            <button>Me</button>
            <button>For Business</button>
          </div>
        </nav>
      </header>

      <main className="layout">
        <aside>
          <section className="panel">
            <div>
              <img src="avatar.jpg" alt="User avatar" />
              <h3>John Doe</h3>
              <p>Software Engineer</p>
            </div>

            <div>
              <a href="#">Connections</a>
              <a href="#">Profile views</a>
            </div>
          </section>

          <section className="panel">
            <h4>Recent</h4>
            <ul>
              <li>React Developers</li>
              <li>Design Systems</li>
              <li>Frontend Engineering</li>
            </ul>
          </section>
        </aside>

        <section className="space-y-24">
          <article className="post panel primary">
            <header className="post-header">
              <img src="https://placehold.co/48x48" alt="Profile" className="avatar" />

              <div className="author-meta">
                <h4>Sarah Chen</h4>
                <p>Senior Product Designer • 2h</p>
              </div>
            </header>

            <div className="post-content">
              <p>One underrated skill in software engineering is learning how to communicate constraints clearly.</p>

              <p>
                Most project delays aren’t caused by code — they come from unclear expectations, changing requirements,
                and hidden assumptions.
              </p>
            </div>

            <footer className="post-actions">
              <button>Like</button>
              <button>Comment</button>
              <button>Repost</button>
              <button>Share</button>
            </footer>
          </article>
          <article className="post panel primary">
            <header className="post-header">
              <img src="https://placehold.co/48x48" alt="Profile" className="avatar" />

              <div className="author-meta">
                <h4>Sarah Chen</h4>
                <p>Senior Product Designer • 2h</p>
              </div>
            </header>

            <div className="post-content">
              <p>One underrated skill in software engineering is learning how to communicate constraints clearly.</p>

              <p>
                Most project delays aren’t caused by code — they come from unclear expectations, changing requirements,
                and hidden assumptions.
              </p>
            </div>

            <footer className="post-actions">
              <button>Like</button>
              <button>Comment</button>
              <button>Repost</button>
              <button>Share</button>
            </footer>
          </article>
          <article className="post panel primary">
            <header className="post-header">
              <img src="https://placehold.co/48x48" alt="Profile" className="avatar" />

              <div className="author-meta">
                <h4>Sarah Chen</h4>
                <p>Senior Product Designer • 2h</p>
              </div>
            </header>

            <div className="post-content">
              <p>One underrated skill in software engineering is learning how to communicate constraints clearly.</p>

              <p>
                Most project delays aren’t caused by code — they come from unclear expectations, changing requirements,
                and hidden assumptions.
              </p>
            </div>

            <footer className="post-actions">
              <button>Like</button>
              <button>Comment</button>
              <button>Repost</button>
              <button>Share</button>
            </footer>
          </article>
          <article className="post panel primary">
            <header className="post-header">
              <img src="https://placehold.co/48x48" alt="Profile" className="avatar" />

              <div className="author-meta">
                <h4>Sarah Chen</h4>
                <p>Senior Product Designer • 2h</p>
              </div>
            </header>

            <div className="post-content">
              <p>One underrated skill in software engineering is learning how to communicate constraints clearly.</p>

              <p>
                Most project delays aren’t caused by code — they come from unclear expectations, changing requirements,
                and hidden assumptions.
              </p>
            </div>

            <footer className="post-actions">
              <button>Like</button>
              <button>Comment</button>
              <button>Repost</button>
              <button>Share</button>
            </footer>
          </article>
          <article className="post panel primary">
            <header className="post-header">
              <img src="https://placehold.co/48x48" alt="Profile" className="avatar" />

              <div className="author-meta">
                <h4>Sarah Chen</h4>
                <p>Senior Product Designer • 2h</p>
              </div>
            </header>

            <div className="post-content">
              <p>One underrated skill in software engineering is learning how to communicate constraints clearly.</p>

              <p>
                Most project delays aren’t caused by code — they come from unclear expectations, changing requirements,
                and hidden assumptions.
              </p>
            </div>

            <footer className="post-actions">
              <button>Like</button>
              <button>Comment</button>
              <button>Repost</button>
              <button>Share</button>
            </footer>
          </article>

          <article className="post panel primary">
            <header className="post-header">
              <img src="https://placehold.co/48x48" alt="Profile" className="avatar" />

              <div className="author-meta">
                <h4>Sarah Chen</h4>
                <p>Senior Product Designer • 2h</p>
              </div>
            </header>

            <div className="post-content">
              <p>One underrated skill in software engineering is learning how to communicate constraints clearly.</p>

              <p>
                Most project delays aren’t caused by code — they come from unclear expectations, changing requirements,
                and hidden assumptions.
              </p>
            </div>

            <footer className="post-actions">
              <button>Like</button>
              <button>Comment</button>
              <button>Repost</button>
              <button>Share</button>
            </footer>
          </article>
        </section>

        <aside>
          <section className="panel">
            <h4>LinkedIn News</h4>
            <ul>
              <li>React 19 released</li>
              <li>AI job market shifts</li>
              <li>Remote work trends 2026</li>
            </ul>
          </section>

          <section className="panel">
            <article>
              <h4>Boost your profile</h4>
              <p>Get more visibility in search results</p>
              <button>Try Premium</button>
            </article>
          </section>

          <section className="panel">
            <h4>People you may know</h4>

            <article>
              <img src="person2.jpg" alt="User" />
              <p>Alex Johnson</p>
              <button>Connect</button>
            </article>

            <article>
              <img src="person3.jpg" alt="User" />
              <p>Maria Chen</p>
              <button>Connect</button>
            </article>
          </section>
        </aside>
      </main>

      <footer>
        <nav>
          <a href="#">About</a>
          <a href="#">Accessibility</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </nav>
      </footer>
    </div>
  );
}
