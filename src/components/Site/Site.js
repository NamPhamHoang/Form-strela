import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import LayoutCardWithTitleAndPath from '../../templates/LayoutCardWithTitleAndPath';
import Collapse from '../Collapse/Collapse';
import CollapseLink from '../Collapse/CollapseLink';

const Site = props => {
    const { site, children, place } = props;
    const { category, contents, slug, title, collapses } = site;
    const [opened, setOpened] = useState(false);
    return (
        <LayoutCardWithTitleAndPath
            category={category}
            title={title}
            pathItems={[
                { url: '/', label: 'Strona główna' },
                { url: `/${slug}`, label: title },
            ]}
            className="site"
        >
            {place === 1 && children}
            <div dangerouslySetInnerHTML={{ __html: contents }} />
            {place === 2 && children}
            <Accordion className="collapse-styles">
                {collapses &&
                    collapses.map(collapse =>
                        collapse.isLink ? (
                            <CollapseLink key={collapse.id} title={collapse.title} href={collapse.url} />
                        ) : (
                            <Collapse
                                key={collapse.id}
                                title={collapse.title}
                                content={collapse.contents}
                                opened={opened}
                                setOpened={setOpened}
                                {...collapse}
                            />
                        ),
                    )}
            </Accordion>
            {place === 3 && children}
        </LayoutCardWithTitleAndPath>
    );
};

Site.defaultProps = {
    place: 3,
};

export default Site;
