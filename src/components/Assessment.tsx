import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react';
import { assessment, assessmentQuestions } from '../content/assessment';
import { levelById, levels } from '../content/levels';
import { dimensions } from '../content/site';
import type { AssessmentOption, Level, LevelId } from '../content/types';

type Answers = Record<string, AssessmentOption['level']>;

const TOTAL = assessmentQuestions.length;
/** Beige is treated as pre-organizational, so it never appears in the result. */
const SCORED_LEVELS = levels.filter((l) => l.id !== 'beige');

function lvStyle(l: Level) {
  return {
    ['--lv' as string]: l.colors.base,
    ['--lv-deep' as string]: l.colors.deep,
    ['--lv-tint' as string]: l.colors.tint,
  };
}

function scrollToEl(el: HTMLElement | null) {
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

export function Assessment({ onOpenLevel }: { onOpenLevel: (id: LevelId) => void }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [size, setSize] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  const answered = Object.keys(answers).length;
  const unanswered = assessmentQuestions.filter((q) => !answers[q.id]);

  // Move focus to the result heading once the result has rendered.
  useEffect(() => {
    if (submitted) {
      scrollToEl(sectionRef.current);
      resultHeadingRef.current?.focus({ preventScroll: true });
    }
  }, [submitted]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (unanswered.length > 0) {
      setShowErrors(true);
      const first = formRef.current?.querySelector<HTMLInputElement>(`input[name="${uid}-${unanswered[0]!.id}"]`);
      first?.closest('fieldset')?.scrollIntoView({ block: 'center' });
      first?.focus({ preventScroll: true });
      return;
    }
    setSubmitted(true);
  };

  const backToForm = (reset: boolean) => {
    if (reset) {
      setAnswers({});
      setName('');
      setIndustry('');
      setSize('');
      setDescription('');
      setShowErrors(false);
    }
    setSubmitted(false);
    requestAnimationFrame(() => {
      scrollToEl(sectionRef.current);
      formRef.current?.querySelector<HTMLElement>('input, select, textarea')?.focus({ preventScroll: true });
    });
  };

  return (
    <section ref={sectionRef} id="assessment" className="section assess" aria-labelledby="assess-title">
      <div className="wrap">
        <header className="section__head">
          <p className="section__num">04</p>
          <h2 id="assess-title" className="section__title">
            {assessment.title}
          </h2>
          {assessment.intro.map((t) => (
            <p key={t.slice(0, 20)} className="section__intro">
              {t}
            </p>
          ))}
        </header>

        {submitted ? (
          <Result
            answers={answers}
            name={name.trim()}
            meta={[industry, size && `${size} people`].filter(Boolean).join(' · ')}
            hasDescription={description.trim().length > 0}
            headingRef={resultHeadingRef}
            onExplore={onOpenLevel}
            onEdit={() => backToForm(false)}
            onRestart={() => backToForm(true)}
          />
        ) : (
          <div className="assess__grid">
            <form ref={formRef} className="assess__form" onSubmit={onSubmit} noValidate>
              <fieldset className="assess__company">
                <legend className="assess__h">{assessment.companyTitle}</legend>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor={`${uid}-name`}>{assessment.nameLabel}</label>
                    <input
                      id={`${uid}-name`}
                      type="text"
                      value={name}
                      maxLength={120}
                      autoComplete="organization"
                      aria-describedby={`${uid}-name-hint`}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <p id={`${uid}-name-hint`} className="field__hint">
                      {assessment.nameHint}
                    </p>
                  </div>
                  <div className="field">
                    <label htmlFor={`${uid}-industry`}>{assessment.industryLabel}</label>
                    <select id={`${uid}-industry`} value={industry} onChange={(e) => setIndustry(e.target.value)}>
                      <option value="">Choose…</option>
                      {assessment.industries.map((i) => (
                        <option key={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor={`${uid}-size`}>{assessment.sizeLabel}</label>
                    <select id={`${uid}-size`} value={size} onChange={(e) => setSize(e.target.value)}>
                      <option value="">Choose…</option>
                      {assessment.sizes.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor={`${uid}-desc`}>{assessment.descriptionLabel}</label>
                  <p id={`${uid}-desc-hint`} className="field__hint">
                    {assessment.descriptionHint}
                  </p>
                  <textarea
                    id={`${uid}-desc`}
                    rows={6}
                    value={description}
                    maxLength={assessment.descriptionMax}
                    aria-describedby={`${uid}-desc-hint ${uid}-desc-count`}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <p id={`${uid}-desc-count`} className="field__count">
                    {description.length} / {assessment.descriptionMax}
                  </p>
                </div>
              </fieldset>

              <h3 className="assess__h assess__h--questions">{assessment.questionsTitle}</h3>
              <ol className="questions">
                {assessmentQuestions.map((q, qi) => {
                  const missing = showErrors && !answers[q.id];
                  const dim = dimensions.find((d) => d.id === q.dimension)!;
                  return (
                    <li key={q.id}>
                      <fieldset
                        className={`question ${missing ? 'is-missing' : ''}`}
                        aria-describedby={missing ? `${uid}-${q.id}-err` : undefined}
                      >
                        <legend className="question__legend">
                          <span className="question__num">{String(qi + 1).padStart(2, '0')}</span>
                          <span className="question__dim">{dim.title}</span>
                          <span className="question__prompt">{q.prompt}</span>
                        </legend>
                        {missing && (
                          <p id={`${uid}-${q.id}-err`} className="question__err">
                            Please choose an answer.
                          </p>
                        )}
                        <div className="options">
                          {q.options.map((o) => {
                            const checked = answers[q.id] === o.level;
                            return (
                              <label key={o.level} className={`option ${checked ? 'is-checked' : ''}`}>
                                <input
                                  type="radio"
                                  name={`${uid}-${q.id}`}
                                  value={o.level}
                                  checked={checked}
                                  onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.level }))}
                                />
                                <span className="option__text">{o.text}</span>
                              </label>
                            );
                          })}
                        </div>
                      </fieldset>
                    </li>
                  );
                })}
              </ol>

              <div className="assess__submit">
                <button type="submit" className="btn btn--primary">
                  {assessment.submit}
                </button>
                <p className="assess__status" role="status">
                  {showErrors && unanswered.length > 0 ? assessment.missing(unanswered.length) : ''}
                </p>
              </div>
            </form>

            <aside className="assess__aside" aria-label={assessment.asideTitle}>
              <div className="assess__sticky">
                <p className="assess__aside-title">{assessment.asideTitle}</p>
                <p className="assess__count">
                  <span className="assess__count-n">{answered}</span> of {TOTAL} answered
                </p>
                <div className="meter" aria-hidden="true">
                  <span style={{ width: `${(answered / TOTAL) * 100}%` }} />
                </div>
                <ul className="assess__dims">
                  {dimensions.map((d) => {
                    const qs = assessmentQuestions.filter((q) => q.dimension === d.id);
                    const done = qs.filter((q) => answers[q.id]).length;
                    return (
                      <li key={d.id}>
                        <span className="assess__dots" aria-hidden="true">
                          {qs.map((q) => (
                            <span key={q.id} className={answers[q.id] ? 'is-done' : ''} />
                          ))}
                        </span>
                        <span>{d.title}</span>
                        <span className="visually-hidden">
                          : {done} of {qs.length} answered
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <p className="assess__note">{assessment.asideNote}</p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

interface ResultProps {
  answers: Answers;
  name: string;
  meta: string;
  hasDescription: boolean;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onExplore: (id: LevelId) => void;
  onEdit: () => void;
  onRestart: () => void;
}

function Result({ answers, name, meta, hasDescription, headingRef, onExplore, onEdit, onRestart }: ResultProps) {
  const r = assessment.result;

  const ranked = useMemo(() => {
    const counts = new Map<LevelId, number>();
    for (const lv of Object.values(answers)) counts.set(lv, (counts.get(lv) ?? 0) + 1);
    return SCORED_LEVELS.map((l) => ({ level: l, count: counts.get(l.id) ?? 0 })).sort(
      (a, b) => b.count - a.count || a.level.order - b.level.order,
    );
  }, [answers]);

  const top = ranked[0]!.level;
  const second = ranked[1]!;
  const isMixed = ranked[0]!.count - second.count <= 1 && second.count > 0;
  const o = top.organization;

  return (
    <div className="result" style={lvStyle(top)}>
      <div className="result__head">
        <p className="result__for">
          {name || 'Your organization'}
          {meta && <span className="result__meta"> · {meta}</span>}
        </p>
        <p className="result__kicker">{r.kicker}</p>
        <h3 ref={headingRef} tabIndex={-1} className="result__title">
          <span className="swatch swatch--lg" aria-hidden="true" />
          {top.colorLabel}
          <span className="result__principle">{o.principle}</span>
        </h3>
        <p className="result__emphasis">{o.emphasis}</p>
        {isMixed && <p className="result__mixed">{r.mixed(top.colorLabel, second.level.colorLabel)}</p>}
      </div>

      <div className="result__grid">
        <section className="result__block" aria-labelledby="result-profile">
          <h4 id="result-profile" className="panel__h">
            {r.profileTitle}
          </h4>
          <ul className="bars">
            {SCORED_LEVELS.map((l) => {
              const n = ranked.find((x) => x.level.id === l.id)!.count;
              return (
                <li key={l.id} className={`bar ${l.id === top.id ? 'is-top' : ''}`} style={lvStyle(l)}>
                  <span className="bar__label">
                    <span className="swatch" aria-hidden="true" />
                    {l.colorLabel}
                  </span>
                  <span className="bar__track" aria-hidden="true">
                    <span className="bar__fill" style={{ width: `${(n / TOTAL) * 100}%` }} />
                  </span>
                  <span className="bar__n">{r.answersOf(n, TOTAL)}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="result__block" aria-labelledby="result-dims">
          <h4 id="result-dims" className="panel__h">
            {r.byDimensionTitle}
          </h4>
          <dl className="result__dims">
            {dimensions.map((d) => {
              const picked = assessmentQuestions.filter((q) => q.dimension === d.id).map((q) => levelById[answers[q.id]!]);
              const unique = picked.filter((l, i) => picked.findIndex((x) => x.id === l.id) === i);
              return (
                <div key={d.id} className="result__dim">
                  <dt>{d.title}</dt>
                  <dd>
                    {unique.map((l) => (
                      <span key={l.id} className="chip" style={lvStyle(l)}>
                        <span className="swatch" aria-hidden="true" />
                        {l.colorLabel}
                      </span>
                    ))}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>

        <section className="result__block" aria-labelledby="result-str">
          <h4 id="result-str" className="panel__h">
            {r.strengthsTitle}
          </h4>
          <ul className="points">
            {o.strengths.slice(0, 3).map((p) => (
              <li key={p.text}>{p.text}</li>
            ))}
          </ul>
        </section>

        <section className="result__block" aria-labelledby="result-ten">
          <h4 id="result-ten" className="panel__h">
            {r.tensionsTitle}
          </h4>
          <ul className="points">
            {o.tensions.slice(0, 3).map((p) => (
              <li key={p.text}>{p.text}</li>
            ))}
          </ul>
        </section>
      </div>

      {hasDescription && (
        <div className="result__desc">
          <p className="result__desc-title">{r.descriptionTitle}</p>
          <p>{r.descriptionNote}</p>
        </div>
      )}

      <p className="result__caveat">{r.caveat}</p>

      <div className="result__actions">
        <button type="button" className="btn btn--primary" onClick={() => onExplore(top.id)}>
          {r.explore(top.colorLabel)}
        </button>
        <button type="button" className="btn" onClick={onEdit}>
          {r.edit}
        </button>
        <button type="button" className="btn btn--quiet" onClick={onRestart}>
          {r.restart}
        </button>
      </div>
    </div>
  );
}
