interface Props {
  children: string;
}

function PageHeader(props: Props) {
  return (
    <div>
      <h2>{props.children}</h2>
    </div>
  );
}

export default PageHeader;
