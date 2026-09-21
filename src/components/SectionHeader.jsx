import Eyebrow from './Eyebrow.jsx'

export default function SectionHeader({ eyebrow, title, titleMax, titleGap, lede, ledeMax, ledeGap }) {
  return (
    <>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="lu-h2" style={{ maxWidth: titleMax, marginBottom: titleGap }}>
        {title}
      </h2>
      {lede && (
        <p className="lu-lede" style={{ maxWidth: ledeMax, marginBottom: ledeGap }}>
          {lede}
        </p>
      )}
    </>
  )
}
