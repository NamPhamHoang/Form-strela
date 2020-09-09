import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { faBrowser, faEnvelope, faMapMarker, faPhone } from '@fortawesome/pro-light-svg-icons';
import Accordion from 'react-bootstrap/Accordion';
import { Helmet } from 'react-helmet';
import Path from '../../../components/Path/Path';
import LayoutCard from '../../../components/Cards/LayoutCards/LayoutCard';
import Title from '../../../components/Titles/Title/Title';
import { PrimaryButton } from '../../../components/Buttons/Button';
import { gate } from '../../../api';
import Collapse from '../../../components/Collapse/Collapse';
import {
    CloseButton,
    ContactCollapseGrid,
    ContactWrapper,
    Grid,
    IconItem,
    Item,
    NameP,
    StyledFontAwesomeIcon,
    StyledPrimaryButton,
} from './components';

export const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [opened, setOpened] = useState(null);
    const [contactOpened, setContactOpened] = useState({ collapses: [] });
    const [openedId] = useState(null);

    useEffect(() => {
        axios
            .get(`${gate}/contact`)
            .then(({ data: { contacts: newContacts } }) => {
                setContacts(newContacts);
            })
            .catch(() => {});
    }, []);

    useEffect(() => {}, [openedId]);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [contactOpened]);

    return (
        <>
            <Helmet>
                <title>Kontakt - Oficjalny Portal Gminy Jarocin</title>
                <meta name="description" content="Dane kontaktowe Gminy Jarocin. Zapraszamy do kontaktu!" />
            </Helmet>
            <Path
                items={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/kontakt', label: 'Kontakt' },
                ]}
            />

            <LayoutCard className="buy-ticket">
                <Title>Kontakty</Title>
                <ContactWrapper opened={!!contactOpened.id}>
                    {!!contactOpened.id && (
                        <>
                            <div>
                                <img src={contactOpened.photoUrl} alt="" />
                                <NameP>{contactOpened.name}</NameP>
                            </div>
                            <div>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: contactOpened.content,
                                    }}
                                />

                                {!!contactOpened.address && (
                                    <IconItem>
                                        <StyledFontAwesomeIcon icon={faMapMarker} />
                                        <span>{contactOpened.address}</span>
                                    </IconItem>
                                )}
                                {!!contactOpened.phone && (
                                    <IconItem>
                                        <StyledFontAwesomeIcon icon={faPhone} />
                                        <span>{contactOpened.phone}</span>
                                    </IconItem>
                                )}
                                {!!contactOpened.email && (
                                    <IconItem>
                                        <StyledFontAwesomeIcon icon={faEnvelope} />
                                        <span>{contactOpened.email}</span>
                                    </IconItem>
                                )}
                                {!!contactOpened.siteUrl && (
                                    <>
                                        <IconItem>
                                            <StyledFontAwesomeIcon icon={faBrowser} />
                                            <span>{contactOpened.siteUrl}</span>
                                        </IconItem>

                                        <PrimaryButton size="s" href={contactOpened.siteUrl} target="_blank">
                                            <strong>Przejdź</strong>&nbsp;do strony www
                                        </PrimaryButton>
                                    </>
                                )}

                                <Accordion className="collapse-styles">
                                    {contactOpened.collapses.map(({ id, name, contacts: innerContacts }) => (
                                        <Collapse
                                            renderChild
                                            title={name}
                                            id={id}
                                            opened={opened}
                                            setOpened={setOpened}
                                        >
                                            {innerContacts.map(
                                                ({ id: innerContactId, name: contactName, place, contact }) => (
                                                    <ContactCollapseGrid key={innerContactId}>
                                                        <span>{contactName}</span>
                                                        <span>{place}</span>
                                                        <span>{contact}</span>
                                                    </ContactCollapseGrid>
                                                ),
                                            )}
                                        </Collapse>
                                    ))}
                                </Accordion>
                            </div>
                        </>
                    )}
                    <CloseButton
                        onClick={() => {
                            setContactOpened({ collapses: [] });
                        }}
                    />
                </ContactWrapper>

                <Grid opened={!!openedId}>
                    {contacts.map(contact => {
                        const { id, photoUrl, name, url } = contact;
                        return (
                            <Item key={id} opened={openedId === id}>
                                <img src={photoUrl} alt="" />
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: name,
                                    }}
                                />
                                {url ? (
                                    <StyledPrimaryButton href={url} target="_blank" rel="noopener noreferrer">
                                        <strong>Zobacz</strong>&nbsp;dane kontaktowe
                                    </StyledPrimaryButton>
                                ) : (
                                    <StyledPrimaryButton
                                        onClick={() => {
                                            if (openedId) {
                                                setContactOpened({ collapses: [] });
                                                // setOpenedId(id);
                                                setTimeout(() => {
                                                    setContactOpened(contact);
                                                }, 500);
                                            } else {
                                                // setOpenedId(id);
                                                setContactOpened(contact);
                                            }
                                        }}
                                        size="14px"
                                    >
                                        <strong>Zobacz</strong>&nbsp;dane kontaktowe
                                    </StyledPrimaryButton>
                                )}
                            </Item>
                        );
                    })}
                </Grid>
            </LayoutCard>
        </>
    );
};
