import '../css/SkillsSection.css'

const SKILL_GROUPS = [
  {
    label: 'Engineering',
    items: ['Python', 'Go', 'C# / .NET', 'JavaScript', 'TypeScript', 'PHP', 'Dart', 'Java', 'C'],
  },
  {
    label: 'Applied AI',
    items: ['Machine learning', 'Deep learning', 'NLP', 'Computer vision', 'ASR', 'LLM evaluation', 'RAG', 'Model deployment', 'Whisper', 'DeBERTa', 'XGBoost'],
  },
  {
    label: 'Product & platforms',
    items: ['Microsoft Dynamics 365', 'CRM systems', '.NET', 'n8n', 'React', 'Next.js', 'FastAPI', 'Flask', 'Laravel', 'Flutter', 'Streamlit', 'Node.js'],
  },
  {
    label: 'Data & infrastructure',
    items: ['Microsoft SQL Server (MSSQL)', 'PostgreSQL', 'MySQL', 'Redis', 'Qdrant', 'MongoDB', 'Firebase', 'Docker', 'AWS', 'Google Cloud'],
  },
  {
    label: 'Libraries & tools',
    items: ['PyTorch', 'TensorFlow', 'Keras', 'Hugging Face Transformers', 'CVAT', 'Google Colab', 'Git', 'Figma', 'REST APIs'],
  },
  {
    label: 'Methods & systems',
    items: ['SDLC', 'BPMN', 'CRISP-DM', 'ITIL', 'COBIT', 'ISO 38500', 'Business Model Canvas', 'Market analysis', 'Agentic AI', 'Claude Code', 'OpenAI Codex', 'OpenCode'],
  },
]

export default function SkillsSection() {
  return (
    <section id="skills" className="skills section-wrap" aria-labelledby="skills-heading">
      <div className="skills__heading-row">
        <div>
          <span className="section-label">Capabilities</span>
          <h2 id="skills-heading" className="section-heading">Tools for the work.</h2>
        </div>
        <p className="skills__intro">
          A practical toolkit across software engineering, data systems, and applied machine learning.
        </p>
      </div>

      <div className="skills__grid">
        {SKILL_GROUPS.map((group, index) => (
          <section className="skills__group" key={group.label} aria-labelledby={'skill-group-' + index}>
            <h3 id={'skill-group-' + index}>
              <span>0{index + 1}</span>
              {group.label}
            </h3>
            <p>{group.items.join(' · ')}</p>
          </section>
        ))}
      </div>
    </section>
  )
}
