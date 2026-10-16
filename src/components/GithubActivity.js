import { useEffect, useMemo, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { ScrollReveal } from "./Utils/ScrollReveal";
import "./GithubActivity.css";

const GITHUB_USER = "lauralouieroy";
const PROFILE_URL = `https://github.com/${GITHUB_USER}`;
const API_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`;

function levelForCount(count, max) {
  if (!count) return 0;
  if (max <= 1) return 4;
  const ratio = count / max;
  if (ratio > 0.75) return 4;
  if (ratio > 0.5) return 3;
  if (ratio > 0.25) return 2;
  return 1;
}

function buildWeeks(days) {
  if (!days?.length) return [];

  const weeks = [];
  let current = [];

  days.forEach((day, index) => {
    const weekday = new Date(`${day.date}T00:00:00`).getDay();
    if (index === 0) {
      for (let i = 0; i < weekday; i += 1) {
        current.push(null);
      }
    }

    current.push(day);

    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
  });

  if (current.length) {
    while (current.length < 7) current.push(null);
    weeks.push(current);
  }

  return weeks;
}

export const GithubActivity = () => {
  const [days, setDays] = useState([]);
  const [total, setTotal] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load contributions");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const contributions = data.contributions || [];
        setDays(contributions);
        const sum =
          data.total && typeof data.total === "object"
            ? Object.values(data.total).reduce(
                (acc, n) => acc + (Number(n) || 0),
                0
              )
            : contributions.reduce((acc, d) => acc + (d.count || 0), 0);
        setTotal(sum);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const weeks = useMemo(() => buildWeeks(days), [days]);
  const maxCount = useMemo(
    () => days.reduce((max, d) => Math.max(max, d.count || 0), 0),
    [days]
  );

  return (
    <ScrollReveal>
      <section id="github" className="github-activity">
        <div className="github-activity-container">
          <div className="github-activity-header">
            <div>
              <p className="github-activity-label">ACTIVITY</p>
              <h1 className="section-title">
                GitHub <span>presence</span>
              </h1>
            </div>
          </div>

          <div className="github-activity-panel">
            <div className="github-activity-panel-top">
              <span>GitHub</span>
              <a
                href={PROFILE_URL}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${GITHUB_USER} on GitHub`}
              >
                {total != null
                  ? `${total.toLocaleString()} contributions in the last year`
                  : `@${GITHUB_USER}`}
                <FaArrowUp aria-hidden="true" />
              </a>
            </div>

            <div className="github-activity-calendar">
              {status === "loading" && (
                <p className="github-activity-status">Loading activity…</p>
              )}

              {status === "error" && (
                <p className="github-activity-status">
                  Couldn’t load the contribution graph.{" "}
                  <a href={PROFILE_URL} target="_blank" rel="noreferrer">
                    View on GitHub
                  </a>
                </p>
              )}

              {status === "ready" && (
                <div
                  className="github-heatmap"
                  role="img"
                  aria-label={`GitHub contribution graph for ${GITHUB_USER}`}
                >
                  {weeks.map((week, wi) => (
                    <div key={wi} className="github-heatmap-week">
                      {week.map((day, di) => {
                        if (!day) {
                          return (
                            <span
                              key={`empty-${wi}-${di}`}
                              className="github-heatmap-day is-empty"
                            />
                          );
                        }

                        const level = levelForCount(day.count, maxCount);
                        return (
                          <span
                            key={day.date}
                            className="github-heatmap-day"
                            data-level={level}
                            title={`${day.count} contribution${
                              day.count === 1 ? "" : "s"
                            } on ${day.date}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {status === "ready" && (
              <div className="github-heatmap-legend" aria-hidden="true">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className="github-heatmap-day"
                    data-level={level}
                  />
                ))}
                <span>More</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};
