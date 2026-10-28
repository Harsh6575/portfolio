import { coreStack, skillsData } from "@/constants/skills";

export const Skills = () => {
  return (
    <section id="skills" className="field-light pb-40">
      <div className="column">
        <h2 className="on-view text-lead font-semibold">What I work with</h2>

        <dl className="mt-8 space-y-4">
          {coreStack.map(({ layer, items }) => (
            <div key={layer} className="on-view grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-6">
              <dt className="text-muted-foreground">{layer}</dt>
              <dd className="font-semibold">{items.join(", ")}</dd>
            </div>
          ))}
        </dl>

        <details className="group mt-10">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center font-semibold underline underline-offset-4 hover:no-underline">
            <span className="group-open:hidden">Show everything I&apos;ve used</span>
            <span className="hidden group-open:inline">Show less</span>
          </summary>
          <dl className="mt-6 space-y-5">
            {skillsData.map(group => (
              <div key={group.category}>
                <dt className="flex justify-between gap-4 text-small text-muted-foreground tabular-nums">
                  <span>{group.category}</span>
                  <span>{group.period}</span>
                </dt>
                <dd className="mt-1">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </details>
      </div>
    </section>
  );
};
