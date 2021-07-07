import React from 'react';
import BasePortableText from '@sanity/block-content-to-react';
import {Link} from 'gatsby';

import clientConfig from '../../client-config';
import Figure from './media/figure';

const serializers = {
  marks: {
    internalLink: ({
      mark: {
        item: {slug = {}},
      },
      children,
    }) => {
      return <Link to={`/work/${slug.current}`}>{children}</Link>;
    },
    externalLink: ({children, mark}) => {
      return mark.blank ? (
        <a target='_blank' rel='noopener noreferrer' href={mark.href}>
          {children}
        </a>
      ) : (
        <a href={mark.href}>{children}</a>
      );
    },
  },
  types: {
    figure: ({node}) => <Figure alt={node.alt} image={node.asset} />,
  },
};

const PortableText = ({blocks}) => {
  return (
    <BasePortableText
      serializers={serializers}
      blocks={blocks}
      {...clientConfig.sanity}
    />
  );
};

export default PortableText;
