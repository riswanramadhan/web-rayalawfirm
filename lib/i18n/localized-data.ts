import { articles, type Article } from '@/lib/data/articles';
import { services, type Service } from '@/lib/data/services';
import { lawyers, type Lawyer } from '@/lib/data/team';
import { testimonials, type Testimonial } from '@/lib/data/testimonials';
import { defaultLocale, type Locale } from './config';

type ServiceTranslation = Omit<Service, 'slug' | 'icon'>;
type LawyerTranslation = Pick<
  Lawyer,
  'position' | 'specialization' | 'expertise' | 'achievements' | 'handledCases'
>;
type TestimonialTranslation = Pick<
  Testimonial,
  'position' | 'kasusType' | 'text'
>;
type ArticleTranslation = Pick<
  Article,
  | 'title'
  | 'excerpt'
  | 'category'
  | 'author'
  | 'readTime'
  | 'tags'
  | 'content'
  | 'metaTitle'
  | 'metaDesc'
>;

const serviceTranslationsEn: Record<string, ServiceTranslation> = {
  'hukum-pidana': {
    title: 'Criminal Law',
    shortDesc:
      'Comprehensive criminal defense assistance from investigation to trial with a measured defense strategy.',
    fullDesc: `Criminal matters require precise steps from the earliest investigation stage. We ensure client rights are protected, review the legality of investigative actions, and prepare an early response so the legal position remains strong. Each step at the beginning can affect the entire process that follows.

Our team prepares defense strategies based on facts, evidence, and legal analysis. We assist during witness and suspect examinations, draft objections, challenge evidence, and pursue appeals, cassation, and case review when needed.

Beyond defense, we provide compliance advice and risk mitigation for individuals and corporations so potential criminal exposure can be prevented as early as possible.`,
    highlights: [
      'Assistance from inquiry and investigation stages',
      'Defense strategy based on evidence analysis',
      'Support during witness and suspect examinations',
      'Appeals, cassation, and judicial review',
      'Corporate criminal risk mitigation',
    ],
    process: [
      {
        title: 'Initial Consultation',
        desc: 'Map the case chronology, current process status, and urgent client needs.',
      },
      {
        title: 'File Review',
        desc: 'Review examination reports, summons, evidence, and the legal position of the parties.',
      },
      {
        title: 'Defense Strategy',
        desc: 'Determine the litigation approach, witness list, and core legal arguments.',
      },
      {
        title: 'Process Assistance',
        desc: 'Assist during examinations, hearings, and coordination with required experts.',
      },
      {
        title: 'Decision Evaluation',
        desc: 'Assess the decision and prepare further legal remedies when needed.',
      },
    ],
    faq: [
      {
        question: 'When should I contact a criminal lawyer?',
        answer:
          'As soon as there is an official summons, indication of examination, or police report, because early assistance helps protect rights and defense strategy.',
      },
      {
        question: 'Can assistance begin during the inquiry stage?',
        answer:
          'Yes. We can be present during the inquiry stage to ensure procedures comply with the law and protect the client position.',
      },
      {
        question: 'How are criminal defense fees determined?',
        answer:
          'Fees are determined by case complexity, process stage, and assistance needs. We prepare a transparent fee structure from the start.',
      },
      {
        question: 'Do you handle corporate criminal cases?',
        answer:
          'Yes. We handle criminal matters involving business entities, including internal coordination, compliance, and strategic communication.',
      },
    ],
    metaTitle: 'Criminal Law | Raya Law Firm',
    metaDesc:
      'Professional criminal law assistance from investigation to trial with a measured defense strategy by Raya Law Firm.',
  },
  'hukum-perdata': {
    title: 'Civil Law',
    shortDesc:
      'Resolution of civil disputes, contracts, and compensation claims through balanced litigation and negotiation.',
    fullDesc: `Civil disputes often arise from contracts, cooperation agreements, or business relationships that do not run as expected. We help clients define a clear legal position, assess the strength of evidence, and build a realistic settlement strategy.

Our approach prioritizes efficiency through negotiation and mediation while remaining ready to litigate when necessary. We handle breach of contract claims, unlawful acts, obligation disputes, and compensation claims comprehensively.

We also assist in drafting and reviewing contracts so dispute risks can be minimized from the beginning and clients receive greater legal certainty.`,
    highlights: [
      'Breach of contract and unlawful act claims',
      'Business contract drafting and review',
      'Negotiation, mediation, and arbitration',
      'Evidence strategy and document strengthening',
      'Efficient dispute resolution',
    ],
    process: [
      {
        title: 'Initial Assessment',
        desc: 'Identify the dispute root, the parties positions, and the client objective.',
      },
      {
        title: 'Document Analysis',
        desc: 'Review agreements, correspondence, and transaction evidence in detail.',
      },
      {
        title: 'Resolution Options',
        desc: 'Prepare the most effective negotiation, mediation, or litigation route.',
      },
      {
        title: 'Strategy Implementation',
        desc: 'Execute resolution steps, including preparing a lawsuit when needed.',
      },
      {
        title: 'Outcome Evaluation',
        desc: 'Assess the final result and secure enforcement of decisions or settlements.',
      },
    ],
    faq: [
      {
        question: 'Must every civil dispute go to court?',
        answer:
          'No. Many disputes can be resolved through negotiation or mediation when the parties are open to a fair solution.',
      },
      {
        question: 'What documents should be prepared?',
        answer:
          'Contracts, payment evidence, correspondence, and other supporting documents relevant to the legal relationship between the parties.',
      },
      {
        question: 'How long does a civil lawsuit take?',
        answer:
          'Duration varies depending on case complexity, number of parties, and the evidence process at trial.',
      },
      {
        question: 'Can immaterial damages be claimed?',
        answer:
          'Yes, as long as there is a legal basis and proof of loss that can be accounted for in court.',
      },
    ],
    metaTitle: 'Civil Law | Raya Law Firm',
    metaDesc:
      'Civil dispute, contract, and compensation solutions with effective negotiation and litigation strategies from Raya Law Firm.',
  },
  'hukum-bisnis': {
    title: 'Business & Corporate Law',
    shortDesc:
      'Corporate legal assistance from business establishment and compliance to strategic business transactions.',
    fullDesc: `We assist corporations in building a healthy legal foundation, from establishing business entities and structuring capital to aligning governance. Every business decision carries legal consequences that should be mapped from the start.

Our team is experienced in due diligence, commercial contract drafting, and transaction assistance such as investment, acquisition, and strategic cooperation. Our approach balances business needs with strict legal compliance.

With a strong understanding of industry context, we help clients manage risk, maintain compliance, and ensure every transaction is legally protected.`,
    highlights: [
      'PT, CV establishment and articles amendment',
      'Due diligence for investments and acquisitions',
      'Business contracts, MoUs, and vendor agreements',
      'Corporate compliance and governance',
      'Strategic transaction negotiation assistance',
    ],
    process: [
      {
        title: 'Business Needs Assessment',
        desc: 'Explore the business model, transaction objectives, and risks faced.',
      },
      {
        title: 'Legal Audit',
        desc: 'Review corporate documents, licenses, and internal company compliance.',
      },
      {
        title: 'Structuring & Drafting',
        desc: 'Prepare safe transaction structures and contractual documents.',
      },
      {
        title: 'Negotiation & Implementation',
        desc: 'Assist negotiations and ensure implementation follows the agreement.',
      },
      {
        title: 'Compliance Monitoring',
        desc: 'Review post-transaction compliance and update legal documents.',
      },
    ],
    faq: [
      {
        question: 'Is due diligence needed for minority investments?',
        answer:
          'Yes, it is recommended because minority rights, hidden liabilities, and legal risks can affect investment value.',
      },
      {
        question: 'How long does PT establishment take?',
        answer:
          'It depends on document and licensing readiness, but we accelerate the process through a structured workflow.',
      },
      {
        question: 'Do you help prepare compliance SOPs?',
        answer:
          'Yes. We help design SOPs, internal policies, and compliance training for client teams.',
      },
      {
        question: 'Can you assist vendor contract negotiations?',
        answer:
          'Yes. We assess risks, prepare bargaining positions, and ensure key clauses protect the client.',
      },
    ],
    metaTitle: 'Business & Corporate Law | Raya Law Firm',
    metaDesc:
      'Corporate legal assistance, due diligence, and strategic business transactions focused on compliance and risk protection.',
  },
  'hukum-keluarga': {
    title: 'Family Law',
    shortDesc:
      'Sensitive and professional assistance in divorce, child custody, inheritance, and grants.',
    fullDesc: `Family matters require a firm yet empathetic approach. We help clients navigate divorce, division of marital assets, and child custody disputes while prioritizing legal certainty and the best interests involved.

We also handle inheritance and grant disputes, including planning family asset distribution to prevent future conflict. Every step is designed carefully so the process remains effective and dignified.

Our approach places clear communication first, ensuring clients understand their legal rights and obligations at every stage.`,
    highlights: [
      'Divorce and marital asset division',
      'Child custody and support',
      'Family inheritance and grant disputes',
      'Prenuptial and postnuptial agreements',
      'Empathetic family mediation',
    ],
    process: [
      {
        title: 'Confidential Consultation',
        desc: 'Listen to family matters safely and confidentially.',
      },
      {
        title: 'Rights & Obligations Mapping',
        desc: 'Explain the legal position regarding marital assets, custody, and support.',
      },
      {
        title: 'Resolution Plan',
        desc: 'Prepare a mediation or litigation strategy based on client needs.',
      },
      {
        title: 'Process Assistance',
        desc: 'Assist hearings, mediation, and agreement drafting.',
      },
      {
        title: 'Finalization & Implementation',
        desc: 'Oversee decision implementation and related administrative matters.',
      },
    ],
    faq: [
      {
        question: 'Does divorce always have to go through court?',
        answer:
          'Yes, divorce in Indonesia is decided by court according to religion and applicable regulations.',
      },
      {
        question: 'How is child custody determined?',
        answer:
          'Custody is decided based on the best interests of the child by considering the condition of both parents and the child.',
      },
      {
        question: 'Can a prenuptial agreement be made after marriage?',
        answer:
          'Yes, through a postnuptial agreement ratified under the required legal procedure.',
      },
      {
        question: 'Can you assist family mediation?',
        answer:
          'Yes. We provide mediation assistance to reach fair and sustainable agreements.',
      },
    ],
    metaTitle: 'Family Law | Raya Law Firm',
    metaDesc:
      'Sensitive and professional family law assistance for divorce, custody, inheritance, and grants.',
  },
  'hukum-properti': {
    title: 'Property & Land Law',
    shortDesc:
      'Assistance for property and land transactions and disputes with thorough document verification.',
    fullDesc: `Property and land disputes are often complex because they involve ownership history, land office data, and layered transactions. We help clients verify documents, confirm rights status, and avoid duplicate certificate risks.

For transactions, we prepare sale and purchase agreements, deeds, and supporting documents so the process runs safely. We also handle boundary disputes, certificate cancellation, and property asset protection.

Our approach prioritizes clarity of asset legal status and efficient resolution so the client property value remains protected.`,
    highlights: [
      'Land document due diligence',
      'Boundary and ownership dispute resolution',
      'Sale deed and property transaction assistance',
      'Problematic certificate cancellation',
      'Asset protection and compensation negotiation',
    ],
    process: [
      {
        title: 'Initial Review',
        desc: 'Identify the land object, ownership history, and dispute risks.',
      },
      {
        title: 'Document Verification',
        desc: 'Confirm certificate validity, land maps, and supporting documents.',
      },
      {
        title: 'Resolution Strategy',
        desc: 'Prepare mediation, negotiation, or litigation steps based on the case.',
      },
      {
        title: 'Process Assistance',
        desc: 'Assist transactions or hearings until the dispute is resolved.',
      },
      {
        title: 'Asset Protection',
        desc: 'Ensure client rights are protected and documents are updated.',
      },
    ],
    faq: [
      {
        question: 'How can I ensure a certificate is not problematic?',
        answer:
          'Through land office checks, land map verification, and comprehensive tracing of rights history.',
      },
      {
        question: 'Can land disputes be resolved outside court?',
        answer:
          'Yes, through mediation or deliberation. If no agreement is reached, litigation becomes the final option.',
      },
      {
        question: 'Do you assist commercial property transactions?',
        answer:
          'Yes. We assist residential and commercial property transactions, including contract review.',
      },
      {
        question: 'Can you handle certificate cancellation?',
        answer:
          'Yes, with a strong basis and procedures aligned with land and administrative court rules.',
      },
    ],
    metaTitle: 'Property & Land Law | Raya Law Firm',
    metaDesc:
      'Property and land legal solutions for secure transactions, certificate verification, and dispute resolution.',
  },
  'hukum-ketenagakerjaan': {
    title: 'Employment Law',
    shortDesc:
      'Industrial relations advocacy, employment agreement drafting, and balanced termination handling.',
    fullDesc: `Healthy industrial relations require legal certainty for both companies and employees. We assist in preparing employment agreements, company regulations, and internal policies that comply with employment regulations.

In disputes, we assist bipartite negotiations, mediation, and proceedings at the Industrial Relations Court. Our approach balances business interests with employee rights protection.

We also handle compliance aspects, employment audits, and risk mitigation so management decisions can be legally accountable.`,
    highlights: [
      'Employment agreements and company regulations',
      'Bipartite and mediation assistance',
      'Termination and severance strategy',
      'Employment compliance audits',
      'Advocacy at the Industrial Relations Court',
    ],
    process: [
      {
        title: 'Employment Audit',
        desc: 'Assess company compliance with regulations and employment contracts.',
      },
      {
        title: 'Document Drafting',
        desc: 'Prepare or update company regulations and collective labor agreements.',
      },
      {
        title: 'Dispute Management',
        desc: 'Handle bipartite negotiations, mediation, and hearings when needed.',
      },
      {
        title: 'Implementation Assistance',
        desc: 'Guide management decision execution according to legal procedure.',
      },
      {
        title: 'Evaluation & Improvement',
        desc: 'Prepare policy improvements to prevent recurring disputes.',
      },
    ],
    faq: [
      {
        question: 'Must a company have company regulations?',
        answer:
          'Yes, companies with a certain number of workers must have company regulations or a collective labor agreement ratified under the rules.',
      },
      {
        question: 'What is the first step in an employment dispute?',
        answer:
          'The first step is bipartite negotiation to seek a solution without litigation.',
      },
      {
        question: 'How is severance calculated?',
        answer:
          'Severance is calculated based on length of service and rights components under applicable regulations.',
      },
      {
        question: 'Can employees challenge unilateral termination?',
        answer:
          'Yes. Employees may file a claim at the Industrial Relations Court if procedures are not followed.',
      },
    ],
    metaTitle: 'Employment Law | Raya Law Firm',
    metaDesc:
      'Employment law assistance for companies and workers, from compliance to dispute resolution.',
  },
  'hukum-ptun': {
    title: 'State Administrative Court Law (PTUN)',
    shortDesc:
      'Legal assistance to challenge and annul harmful State Administrative Decisions (KTUN).',
    fullDesc: `State Administrative disputes arise when decisions by public officials or bodies harm the interests of individuals or legal entities. We assist clients in testing the validity of State Administrative Decisions (KTUN) so administrative justice can be upheld.

Our team is experienced in preparing lawsuits to annul government decisions, civil service disputes, licensing matters, and land disputes that fall under PTUN jurisdiction. We analyze whether a decision conflicts with regulations or violates the General Principles of Good Governance.

With careful work and strong legal arguments, we ensure client rights as citizens or business actors remain protected from administrative abuse of authority.`,
    highlights: [
      'Annulment claims against State Administrative Decisions (KTUN)',
      'Civil servant and ASN disputes',
      'Business license revocation or rejection disputes',
      'Review of General Principles of Good Governance',
      'Administrative disputes related to land rights',
    ],
    process: [
      {
        title: 'Case & Legal Standing Assessment',
        desc: 'Review the disputed administrative decision and confirm the client legal standing to sue.',
      },
      {
        title: 'Administrative Remedies',
        desc: 'Assist objections or administrative appeals to the relevant superior agency before going to court.',
      },
      {
        title: 'Lawsuit Drafting',
        desc: 'Formulate precise claims based on defects in authority, procedure, or substance.',
      },
      {
        title: 'Court Proceedings',
        desc: 'Represent clients in evidence, witness examination, and submission of conclusions at PTUN hearings.',
      },
      {
        title: 'Execution Monitoring',
        desc: 'Ensure annulment or revocation decisions are implemented by the relevant administrative official.',
      },
    ],
    faq: [
      {
        question: 'What is a State Administrative Decision (KTUN)?',
        answer:
          'KTUN is a written determination by a state administrative official that is concrete, individual, final, and creates legal consequences.',
      },
      {
        question: 'Is there a deadline to file a PTUN lawsuit?',
        answer:
          'Yes, a lawsuit must be filed within 90 days from receipt or announcement of the KTUN.',
      },
      {
        question:
          'Can I sue directly at PTUN without first reporting to the agency?',
        answer:
          'It depends on the rules. For many disputes, the law requires administrative remedies first before filing at PTUN.',
      },
      {
        question:
          'Does PTUN hear cooperation contract disputes with the government?',
        answer:
          'Not always. If the dispute is purely civil, such as breach of contract, it falls under District Court jurisdiction. PTUN hears unilateral administrative decisions.',
      },
    ],
    metaTitle: 'State Administrative Court Law (PTUN) | Raya Law Firm',
    metaDesc:
      'PTUN dispute assistance for KTUN annulment, licensing disputes, and civil service matters by Raya Law Firm.',
  },
};

const lawyerTranslationsEn: Record<string, LawyerTranslation> = {
  alif: {
    position: 'Managing Partner',
    specialization: 'Civil Law, Criminal Law & Corporate Lawyer',
    expertise: [],
    achievements: [
      'Advocate Professional Skills Education Training (PKPA) 2023',
      'DPN Indonesia Advocate Member',
      'Advocate Professional Qualification Certification',
    ],
    handledCases: [
      'Litigation and Civil Law',
      'Criminal Law',
      'Corporate Lawyer',
      'Legal Risk Management',
    ],
  },
  arham: {
    position: 'Partner / Advocate',
    specialization: 'Litigation and Civil Law',
    expertise: ['Litigation and Civil Law'],
    achievements: ['PERADI Member'],
    handledCases: [],
  },
  yuli: {
    position: 'Partner / Advocate',
    specialization: 'Legal Risk Management & Legal Drafting',
    expertise: [
      'Legal Risk Identification and Mitigation',
      'Contract & Agreement Analysis',
      'Legal Drafting & Writing',
      'Legal Risk Management',
      'Legal Documentation & Administration Management',
    ],
    achievements: [
      'Special Advocate Professional Education (PKPA)',
      'Advocate Professional Qualification Certification',
    ],
    handledCases: ['Criminal cases', 'Civil cases', 'Employment law'],
  },
  dimas: {
    position: 'Partner / Advocate',
    specialization: 'Litigation, Employment, Civil, Criminal',
    expertise: ['Litigation', 'Employment', 'Civil', 'Criminal'],
    achievements: ['Mediation'],
    handledCases: ['Litigation', 'Employment', 'Civil', 'Land Dispute', 'Debt Collection'],
  },
};

const testimonialTranslationsEn: Record<number, TestimonialTranslation> = {
  1: {
    position: 'Corporate Client',
    kasusType: 'Business Case Mediation',
    text:
      'Thank you to Raya Law Firm for helping resolve a matter through mediation between me and my client. Raya Law Firm provided very precise legal direction and steps for the case I faced. Thank you, Team Raya Law Firm, continued success.',
  },
  2: {
    position: 'Business Owner',
    kasusType: 'Industrial Relations Dispute',
    text:
      'As a business owner, industrial relations disputes are highly sensitive for company stability. RAYA Law Firm helped us resolve this employment dynamic with a very professional and objective approach while maintaining good relations between the parties. Their strategic solution aligned legal regulations with our business continuity. Highly reliable!',
  },
  3: {
    position: 'Homemaker',
    kasusType: 'Child Custody',
    text:
      'Facing a child custody trial was one of the hardest moments of my life. However, the RAYA Law Firm legal team did not only work as legal counsel, but also became an extraordinary emotional support. They fought with empathy and persistence for my child best interests. Thank you for the dedication and outstanding final result.',
  },
  4: {
    position: 'Entrepreneur',
    kasusType: 'Land Dispute',
    text:
      'Property assets are crucial capital for an entrepreneur, and when my land was involved in a unilateral claim dispute, I was worried. Fortunately, RAYA Law Firm moved quickly. Their legal evidence analysis was sharp, their courtroom tactics were mature, and my ownership rights were ultimately fully defended. Truly high-class assistance!',
  },
  5: {
    position: 'Trading Business Owner',
    kasusType: 'Industrial Relations Dispute',
    text:
      'As a trading business owner, we were confused when facing an industrial relations dispute with a former worker. RAYA Law Firm accompanied us from the bipartite stage through mediation with great patience. They helped us understand rights and obligations transparently, so the matter could be resolved fairly without disrupting daily business operations.',
  },
  6: {
    position: 'State Apparatus',
    kasusType: 'Breach of Contract',
    text:
      'Integrity is my top priority. When a business partner breached an agreed contract, RAYA Law Firm provided a very measured legal audit and demand letter strategy. Their firm approach within the proper legal corridor successfully pushed the opposing party to fulfill its obligations without prolonged delay. Very professional.',
  },
  7: {
    position: 'Labor Worker',
    kasusType: 'Breach of Contract',
    text:
      'I felt completely stuck when my financial rights under a cooperation agreement were not fulfilled by the other party. RAYA Law Firm proved that they care about justice for all communities. They defended my rights persistently regardless of social status. Thank you for restoring what should have been mine.',
  },
};

const articleTranslationsEn: Record<string, ArticleTranslation> = {
  'cara-membuat-perjanjian-yang-kuat-secara-hukum': {
    title: 'How to Draft a Legally Strong Agreement',
    excerpt:
      'A written agreement is the foundation of legal certainty that protects the rights and obligations of the parties. This article explains validity requirements, clause structure, and practical steps to make your agreement truly effective.',
    category: 'Civil Law',
    author: 'Raya Law Firm Editorial Team',
    readTime: '7 min read',
    tags: ['agreement', 'contract', 'civil law'],
    content: `## Why Agreements Should Be Written
A written agreement is the main tool for protecting legal certainty around rights and obligations. In business and personal practice, verbal agreements often create different interpretations when a dispute arises. A written document provides concrete evidence of what was agreed, when it applies, and how it should be performed. For that reason, a written agreement is not merely a formality, but a protection mechanism that reduces the risk of future conflict.

A good agreement also helps create discipline in performance. When obligations, payment schedules, or quality standards are stated clearly, the parties can measure performance and avoid disputes based on assumptions. A well-structured document will support collection, audit, and proof in court if the dispute cannot be settled amicably.

## Validity Requirements and Clause Structure
Under Indonesian civil law, four requirements make an agreement valid: consent of the parties, legal capacity, a specific object, and a lawful cause. These elements must exist in practice, not only on paper. Therefore, the identities of the parties, signing authority, and description of the agreement object must be written precisely.

A neat clause structure makes implementation easier. Ideally, an agreement includes definitions, scope of work, rights and obligations, term, and price or compensation provisions. Clauses on performance standards, amendment mechanisms, and dispute resolution methods should not be overlooked. The clearer the structure, the smaller the room for harmful interpretation.

Default and damages clauses are often neglected even though they are critical when a breach occurs. Define what counts as default, the warning period, and reasonable compensation. Include a force majeure clause so events beyond the parties control have a fair resolution procedure. This protects both sides from unrealistic expectations.

## Best Practices Before Signing
Before signing, conduct simple due diligence on the counterparty. Check business legality, licenses, and signing authority. For high-value transactions, legal due diligence can reveal potential disputes, security encumbrances, or hidden obligations. This step protects your interests and prevents an agreement from being annulled due to legal defects.

Document the negotiation process and ensure the final version is approved by all parties. Avoid last-minute changes without verification, and make sure each party understands the obligations written in the agreement. If the agreement contains technical terms, include clear definitions. For cross-border transactions or foreign parties, consider a bilingual agreement to prevent conflicting interpretations later.

## Closing
A strong agreement is an investment in protection. With proper drafting, an agreement does not only lock in your rights, it also keeps business relationships healthy. Consulting a legal advisor helps map risks and prepare clauses that fit your needs, so the agreement works when it is needed.`,
    metaTitle: 'Legally Strong Agreements | Raya Law Firm',
    metaDesc:
      'Guide to preparing valid and effective agreements, from legal requirements and clause structure to practical tips before signing a contract.',
  },
  'hak-tenaga-kerja-saat-phk-panduan-praktis': {
    title: 'Employee Rights During Termination: A Practical Guide',
    excerpt:
      'Employment termination must follow procedure and provide minimum rights to employees. Learn the legal basis, steps to take, and documents to prepare so your position remains protected.',
    category: 'Employment Law',
    author: 'Raya Law Firm Editorial Team',
    readTime: '8 min read',
    tags: ['termination', 'employment', 'employee rights'],
    content: `## Legal Basis for Termination and Minimum Rights
Employment termination is a final step that should ideally be taken after preventive efforts have been attempted. Indonesian employment regulations require termination to be supported by clear reasons, proper procedure, and fulfillment of employee rights. Government Regulation Number 35 of 2021 is an important reference for termination grounds, negotiation mechanisms, and compensation formulas.

Minimum employee rights include severance pay, service appreciation pay, and compensation for rights. Other rights such as unused annual leave, transportation costs, and unpaid religious holiday allowance must also be checked. The amount of compensation depends heavily on length of service, the reason for termination, and the agreed employment status.

## Steps Employees Should Take
The first step is to review the termination letter carefully. Make sure the termination reason is clearly stated, including its legal basis. If there is any inconsistency, the employee has the right to request written clarification. Keep all official communication, performance evidence, and employment documents so your position has a strong basis.

If there is disagreement, bipartite negotiation must be carried out first within the required timeframe. The result of bipartite negotiation must be recorded in written minutes. If no agreement is reached, the employee may proceed to mediation at the local manpower office. This process is important because it is a prerequisite before bringing the dispute to the Industrial Relations Court.

## Negotiation Strategy and Documents to Prepare
Employees should calculate their rights independently by referring to length of service and applicable provisions. Prepare the employment contract, payslips, position transfer records, BPJS payment evidence, and holiday allowance evidence. These documents support the calculation of rights and strengthen your position during negotiation.

In negotiation, focus on certainty of the amount and timing of payment. A good agreement is written and contains a clear payment schedule. If the company offers a compensation package, ensure every component is calculated transparently and does not eliminate rights that should be received.

Consider involving a labor union or legal assistant when information is imbalanced. A companion helps ensure calculations follow the rules and prevents psychological pressure in negotiation. Record each meeting and request copies of minutes, because these documents will be important evidence if the dispute continues to mediation or court.

## Common Mistakes to Avoid
A common employee mistake is signing a resignation letter or statement of rights acceptance without understanding the consequences. This can significantly reduce severance rights. On the other side, companies often terminate employment without bipartite procedure, which can create a larger dispute.

## Closing
Termination is not only an administrative matter; it concerns rights protected by law. By understanding the legal basis and correct process, employees can keep their position protected. Legal consultation can help assess whether termination is proper and ensure your rights are calculated fairly.`,
    metaTitle: 'Employee Rights During Termination | Raya Law Firm',
    metaDesc:
      'A practical guide to employee rights during termination, from legal basis and bipartite steps to documents that should be prepared.',
  },
  'sengketa-tanah-dan-sertifikat-ganda': {
    title: 'Land Disputes and Duplicate Certificates: How to Respond',
    excerpt:
      'Duplicate certificates often trigger complex land disputes. Understand the causes, verification steps, and resolution strategies so your asset remains protected.',
    category: 'Property & Land Law',
    author: 'Raya Law Firm Editorial Team',
    readTime: '8 min read',
    tags: ['land', 'duplicate certificate', 'property'],
    content: `## Common Causes of Duplicate Certificates
A duplicate certificate occurs when one parcel of land has more than one certificate issued at different times. This condition often arises because land map data is not synchronized, natural boundaries have changed, or the history of title transfer was not recorded neatly. As a result, two parties may both believe they hold valid rights.

In practice, duplicate certificates can also be triggered by weak verification during transactions, use of old title documents that were never updated, or unsettled inheritance records. When conflict occurs, the dispute is not only about ownership, but also the economic value of the asset and the continuity of investment plans.

## Verification and Mediation Steps
The first step is to conduct an official check at the land office to verify certificate status, land maps, and rights history. This examination helps determine whether there is overlap or administrative error. In addition, field remeasurement involving land office officers can clarify physical boundaries.

Mediation is often an effective way to resolve disputes without lengthy litigation. Through mediation, the parties can negotiate solutions that consider their interests, such as area division, compensation, or transfer of rights. Properly documented mediation helps prevent the same dispute from recurring later.

## Litigation Strategy and Asset Protection
If mediation fails, litigation becomes an option. Land disputes may be filed through a civil lawsuit to determine ownership, or through the State Administrative Court when the issue relates to administrative error in certificate issuance. In some cases, criminal elements may arise if document falsification is found.

Beyond litigation routes, it is important to collect historical evidence such as land tax payment proof, land history certificates, and witness statements from people who know the physical boundaries. These materials often become decisive in court to prove actual control and good faith. Collecting evidence early makes your position stronger when the process takes time.

To protect assets while a dispute is ongoing, owners may request certificate blocking or security seizure according to procedure. This step is important so the asset is not transferred to another party and your rights remain protected until the legal process ends.

## Prevention for the Future
Prevention is always better than dispute resolution. Before buying land, conduct thorough due diligence, including land office checks, interviews with surrounding parties, and verification of title documents. Make sure the transaction is handled through a competent land deed official and that all transfer documents are properly recorded.

## Closing
Land disputes require precision and the right strategy from the start. Document verification, mediation, and litigation steps must be prepared in a measured way so assets remain safe. Legal assistance that understands land procedures will help you make the best decision with controlled risk.`,
    metaTitle: 'Land Disputes and Duplicate Certificates | Raya Law Firm',
    metaDesc:
      'Learn the causes of duplicate certificates, verification steps at the land office, and effective land dispute resolution strategies.',
  },
  'risiko-hukum-pidana-digital-dan-perlindungan-data': {
    title: 'Digital Criminal Law Risks and Data Protection',
    excerpt:
      'Digital activity brings new criminal risks for individuals and corporations. This article explains violation categories, corporate responsibility, and preventive steps that should be prepared.',
    category: 'Criminal Law',
    author: 'Raya Law Firm Editorial Team',
    readTime: '9 min read',
    tags: ['digital crime', 'data security', 'compliance'],
    content: `## What Digital Crime Means
Digital crime refers to criminal acts involving information technology, electronic systems, or digital data. The forms vary, from unauthorized access and personal data distribution to online platform fraud. Technological development makes methods increasingly sophisticated, so risks may arise not only for perpetrators but also for parties that fail to secure their systems.

In Indonesia, digital crime provisions are regulated under several rules, including the Electronic Information and Transactions Law and data protection regulations. Violations may occur through harmful content distribution, access misuse, or failure to protect customer data. Understanding legal boundaries is therefore important for individuals and organizations.

## Risks for Individuals and Corporations
For individuals, digital criminal risks often arise from daily activities such as social media use, account management, or online transactions. Posts that harm others, use of data without permission, or attempts to access systems can lead to legal proceedings. Negligence may also create criminal exposure if it causes harm to others.

Corporations face broader risks because they are responsible for system and customer data security. Failure to secure data may cause leaks leading to criminal claims and reputational damage. Internal practices such as use of illegal software or unauthorized data access can also create legal consequences for companies and their management.

Risks may also arise from third parties such as cloud vendors, IT consultants, or digital marketing partners. If contracts do not clearly regulate security and confidentiality obligations, a company may share the impact of a data leak. Therefore, third-party risk management and vendor audits should be part of compliance policy.

## Prevention and Incident Response
Prevention begins with clear governance. Companies should implement role-based access policies, periodic security audits, and staff training on information security. Device use and data storage policies should be written so every employee understands applicable obligations and limits.

If an incident occurs, the first step is to secure systems and preserve digital evidence. Documentation of incident timing, affected data types, and access events is very important for investigation. Legal assistance is needed to ensure communication to relevant parties, including regulators and users, is handled properly and does not create additional risk.

## Closing
Digital criminal risk can be minimized through compliance, education, and incident response readiness. For individuals, careful digital activity is the basic step. For corporations, investment in security and compliance procedures is a strategic need, not just a cost. Legal consultation helps ensure your preventive steps align with applicable regulations.`,
    metaTitle: 'Digital Criminal Risk and Data Protection | Raya Law Firm',
    metaDesc:
      'Understand digital criminal risk, corporate responsibility, and prevention and incident response steps to protect data.',
  },
  'langkah-hukum-perceraian-dan-hak-asuh-anak': {
    title: 'Legal Steps for Divorce and Child Custody',
    excerpt:
      'Divorce must proceed through court procedures with attention to children rights and fairness for the parties. This article explains legal routes, custody, and documents to prepare.',
    category: 'Family Law',
    author: 'Raya Law Firm Editorial Team',
    readTime: '8 min read',
    tags: ['divorce', 'custody', 'family law'],
    content: `## Legal Route Options
In Indonesia, divorce can only be decided through court. Muslim spouses file cases at the Religious Court, while non-Muslim spouses file at the District Court. The court will assess the reasons for divorce, mediation process, and evidence before issuing a decision.

Mediation is a mandatory stage in divorce cases. Its purpose is to give the parties an opportunity to reconcile or agree on the fairest solution. Although it does not always succeed, mediation helps reduce conflict and creates room to arrange custody, support, and division of marital assets.

Reasons for divorce must be legally proven, for example continuous conflict, violence, or abandonment. The court assesses evidence through witnesses, documents, and consistent chronology. Therefore, preparing the case narrative and collecting evidence early will help the judge understand the context and evaluate the reasons objectively.

If the parties have reached agreement, the settlement can be written in an agreement covering custody, support, asset division, and other obligations. A written agreement makes decision implementation easier and reduces potential future conflict. Courts generally respect agreements that are fair and do not harm the child.

## Custody and Child Support
Child custody is decided based on the best interests of the child. Courts consider factors such as the child age, caregiving capacity, emotional stability, and parents ability to meet the child needs. In some cases, courts set shared parenting arrangements so the child remains close to both parents.

In addition to custody, child support remains a parental obligation, particularly for the father unless the decision states otherwise. The support amount is adjusted to ability and the child needs. Written agreements on support, visitation schedules, and education help minimize post-decision conflict.

## Division of Marital Assets
Marital assets are divided according to contribution and applicable legal provisions. Documents such as bank books, certificates, and purchase evidence become the basis for assessment. If there is a prenuptial or postnuptial agreement, the court will use it as the main reference in determining asset division.

In certain cases, assets acquired before marriage or received through inheritance may be categorized as separate property. However, this must be clearly proven through ownership documents and transaction history. Clear asset categorization helps prevent additional disputes after the divorce decision.

## Documents and Process Ethics
Commonly required documents include marriage certificate, identity card, family card, and supporting evidence for divorce grounds. The more complete the documents, the clearer your legal position. Maintaining polite communication and focusing on the child interests will help the process run more smoothly and reduce emotional pressure.

## Closing
Divorce is a legal process that requires calm and a clear strategy. By understanding procedure, custody, and marital asset division, you can make more focused decisions. Legal assistance helps prepare documents, build arguments, and ensure your rights and the child rights are protected.`,
    metaTitle: 'Divorce and Child Custody | Raya Law Firm',
    metaDesc:
      'Guide to divorce procedure, child custody, and marital asset division so the legal process runs clearly and properly.',
  },
  'due-diligence-bisnis-checklist-hukum-sebelum-akuisisi': {
    title: 'Business Due Diligence: Legal Checklist Before Acquisition',
    excerpt:
      'Legal due diligence helps reveal hidden risks before an acquisition. Learn the purpose, key documents, and how to negotiate important findings.',
    category: 'Business Law',
    author: 'Raya Law Firm Editorial Team',
    readTime: '9 min read',
    tags: ['due diligence', 'acquisition', 'business law'],
    content: `## Purpose of Legal Due Diligence
Legal due diligence is the process of assessing a company legal condition before an acquisition or investment transaction. The purpose is not only to check document completeness, but also to identify hidden risks that may affect valuation and transaction structure. With due diligence, a buyer can make more accurate decisions and negotiate adequate protection.

In addition to assessing risks, due diligence helps ensure the company complies with regulations. Non-compliance in licensing, employment, or taxation can affect transaction value and even trigger sanctions. Therefore, this process is a strategic step that should not be ignored.

## Key Document Checklist
Corporate documents are the starting point, including deed of establishment, amendments to articles of association, shareholder structure, and shareholders meeting resolutions. Review business licenses, lists of major assets, and long-term contracts with customers or suppliers. These documents provide a picture of business legitimacy and stability.

Employment documents such as employment agreements, company regulations or collective labor agreements, and ongoing dispute data must also be reviewed. For companies that own property assets, certificate verification and land legal status are crucial. If there is intellectual property, make sure it is validly registered and not under dispute.

A good due diligence process needs a structured data room and clear timeline. Setting materiality thresholds helps focus on issues that truly affect transaction value, not merely administrative findings. With a clear question list, the team can save time while preserving analysis quality.

The due diligence report should be concise but sharp, containing a risk summary, mitigation recommendations, and a list of priority actions. This structure helps decision makers quickly understand legal consequences.

After findings are agreed, ensure the post-transaction remediation plan is recorded, including license renewals, contract consolidation, or internal policy improvements. These post-closing covenants are important so identified risks are actually addressed and do not create new disputes.

## Critical Findings and Negotiation
Due diligence findings can be classified as low, medium, or high risk. High risks usually involve major disputes, licensing violations, or unrecorded liabilities. These findings should be translated into transaction conditions, such as price adjustment, staged payment, or obligations to remedy before closing.

In negotiation, warranty and indemnity clauses are key protection tools. Buyers may request assurances about the accuracy of disclosed data and compensation if hidden findings emerge after the transaction. Escrow or holdback arrangements are often used to retain part of the payment until major risks are resolved.

## Closing
Legal due diligence provides a realistic risk map and helps ensure an acquisition runs safely. With the right checklist and deep analysis, you can avoid costly surprises after the transaction. Professional assistance helps prepare negotiation strategies and transaction structures that best fit your business interests.`,
    metaTitle: 'Business Due Diligence Before Acquisition | Raya Law Firm',
    metaDesc:
      'Legal due diligence guide for acquisition, including document checklist, risk identification, and negotiation strategy.',
  },
};

export function getServices(locale: Locale = defaultLocale): Service[] {
  if (locale === defaultLocale) return services;

  return services.map((service) => ({
    ...service,
    ...(serviceTranslationsEn[service.slug] ?? {}),
  }));
}

export function getServiceBySlug(
  slug: string,
  locale: Locale = defaultLocale
): Service | undefined {
  return getServices(locale).find((service) => service.slug === slug);
}

export function getLawyers(locale: Locale = defaultLocale): Lawyer[] {
  if (locale === defaultLocale) return lawyers;

  return lawyers.map((lawyer) => ({
    ...lawyer,
    ...(lawyerTranslationsEn[lawyer.slug] ?? {}),
  }));
}

export function getLawyerBySlug(
  slug: string,
  locale: Locale = defaultLocale
): Lawyer | undefined {
  return getLawyers(locale).find((lawyer) => lawyer.slug === slug);
}

export function getTestimonials(
  locale: Locale = defaultLocale
): Testimonial[] {
  if (locale === defaultLocale) return testimonials;

  return testimonials.map((testimonial) => ({
    ...testimonial,
    ...(testimonialTranslationsEn[testimonial.id] ?? {}),
  }));
}

export function getArticles(locale: Locale = defaultLocale): Article[] {
  if (locale === defaultLocale) return articles;

  return articles.map((article) => ({
    ...article,
    ...(articleTranslationsEn[article.slug] ?? {}),
  }));
}

export function getArticleBySlug(
  slug: string,
  locale: Locale = defaultLocale
): Article | undefined {
  return getArticles(locale).find((article) => article.slug === slug);
}

